import json
import os
from typing import Dict, Any
import urllib.request
import urllib.error

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Отправка заявок на займ в amoCRM с созданием сделки и контакта
    Args: event - словарь с httpMethod, body (содержит данные формы)
          context - объект с request_id, function_name
    Returns: HTTP response с результатом отправки в CRM
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Request-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Метод не разрешен. Используйте POST'}),
            'isBase64Encoded': False
        }
    
    amocrm_domain = os.environ.get('AMOCRM_DOMAIN', '').strip()
    access_token = os.environ.get('AMOCRM_ACCESS_TOKEN', '').strip()
    
    print(f'[DEBUG] Domain: {amocrm_domain[:20] if amocrm_domain else "empty"}...')
    print(f'[DEBUG] Token exists: {bool(access_token)}')
    
    if not amocrm_domain or not access_token:
        error_msg = {
            'error': 'Настройки amoCRM не заданы',
            'details': 'Добавьте секреты AMOCRM_DOMAIN и AMOCRM_ACCESS_TOKEN',
            'domain_set': bool(amocrm_domain),
            'token_set': bool(access_token)
        }
        print(f'[ERROR] Config missing: {error_msg}')
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(error_msg),
            'isBase64Encoded': False
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        print(f'[DEBUG] Received data: {body_data}')
    except json.JSONDecodeError as e:
        print(f'[ERROR] JSON decode error: {e}')
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Некорректный JSON в теле запроса'}),
            'isBase64Encoded': False
        }
    
    first_name = body_data.get('firstName', '')
    last_name = body_data.get('lastName', '')
    middle_name = body_data.get('middleName', '')
    birth_date = body_data.get('birthDate', '')
    phone = body_data.get('phone', '')
    email = body_data.get('email', '')
    amount = body_data.get('amount', 0)
    period = body_data.get('period', 0)
    reg_address = body_data.get('regAddress', '')
    actual_address = body_data.get('actualAddress', '')
    workplace = body_data.get('workplace', '')
    position = body_data.get('position', '')
    monthly_income = body_data.get('monthlyIncome', '')
    payment_method = body_data.get('paymentMethod', '')
    card_number = body_data.get('cardNumber', '')
    phone_for_sbp = body_data.get('phoneForSbp', '')
    bank_account = body_data.get('bankAccount', '')
    bank_name = body_data.get('bankName', '')
    bank_bik = body_data.get('bankBik', '')
    
    print(f'[DEBUG] Parsed: name={first_name} {last_name}, phone={phone}, amount={amount}')
    
    full_name = f'{first_name} {last_name}'.strip()
    
    if not full_name or not phone:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Укажите имя и телефон'}),
            'isBase64Encoded': False
        }
    
    additional_info = []
    if middle_name:
        additional_info.append(f'Отчество: {middle_name}')
    if birth_date:
        additional_info.append(f'Дата рождения: {birth_date}')
    if reg_address:
        additional_info.append(f'Адрес регистрации: {reg_address}')
    if actual_address:
        additional_info.append(f'Адрес проживания: {actual_address}')
    if workplace:
        additional_info.append(f'Место работы: {workplace}')
    if position:
        additional_info.append(f'Должность: {position}')
    if monthly_income:
        additional_info.append(f'Ежемесячный доход: {monthly_income} руб.')
    if payment_method:
        payment_labels = {'card': 'Банковская карта', 'sbp': 'СБП', 'bank': 'Банковский счет'}
        additional_info.append(f'Способ получения: {payment_labels.get(payment_method, payment_method)}')
    if card_number:
        additional_info.append(f'Номер карты: {card_number}')
    if phone_for_sbp:
        additional_info.append(f'Телефон СБП: {phone_for_sbp}')
    if bank_account:
        additional_info.append(f'Банковский счет: {bank_account}')
    if bank_name:
        additional_info.append(f'Банк: {bank_name}')
    if bank_bik:
        additional_info.append(f'БИК: {bank_bik}')
    
    additional_info.append(f'Срок займа: {period} дней')
    
    description_text = '\n'.join(additional_info)
    
    lead_payload = {
        'name': f'Заявка на займ от {full_name}',
        'price': int(amount),
        '_embedded': {
            'contacts': [{
                'first_name': first_name,
                'last_name': last_name,
                'custom_fields_values': [
                    {
                        'field_code': 'PHONE',
                        'values': [{'value': phone, 'enum_code': 'WORK'}]
                    }
                ]
            }]
        }
    }
    
    if description_text:
        lead_payload['_embedded']['tags'] = [{'name': f'Срок: {period} дн'}]
    
    if email:
        lead_payload['_embedded']['contacts'][0]['custom_fields_values'].append({
            'field_code': 'EMAIL',
            'values': [{'value': email, 'enum_code': 'WORK'}]
        })
    
    api_url = f'https://{amocrm_domain}/api/v4/leads/complex'
    
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json',
        'User-Agent': 'PoehaliDev/1.0'
    }
    
    try:
        request_data = json.dumps([lead_payload]).encode('utf-8')
        print(f'[DEBUG] Sending to amoCRM: {api_url}')
        print(f'[DEBUG] Payload: {lead_payload}')
        
        req = urllib.request.Request(api_url, data=request_data, headers=headers, method='POST')
        
        response = urllib.request.urlopen(req, timeout=10)
        response_data = json.loads(response.read().decode('utf-8'))
        print(f'[DEBUG] amoCRM response: {response_data}')
        
        lead_id = None
        contact_id = None
        
        if response_data and len(response_data) > 0:
            lead_id = response_data[0].get('id')
            embedded = response_data[0].get('_embedded', {})
            contacts = embedded.get('contacts', [])
            if contacts and len(contacts) > 0:
                contact_id = contacts[0].get('id')
            
            if lead_id and description_text:
                note_url = f'https://{amocrm_domain}/api/v4/leads/{lead_id}/notes'
                note_payload = [{
                    'note_type': 'common',
                    'params': {
                        'text': description_text
                    }
                }]
                
                note_data = json.dumps(note_payload).encode('utf-8')
                note_req = urllib.request.Request(note_url, data=note_data, headers=headers, method='POST')
                
                try:
                    urllib.request.urlopen(note_req, timeout=10)
                    print(f'[DEBUG] Note added to lead {lead_id}')
                except Exception as note_error:
                    print(f'[WARNING] Failed to add note: {note_error}')
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'success': True,
                'lead_id': lead_id,
                'contact_id': contact_id,
                'message': 'Заявка успешно создана в amoCRM'
            })
        }
        
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8', errors='ignore')
        print(f'[ERROR] amoCRM HTTP {e.code}: {error_body}')
        return {
            'statusCode': e.code,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'error': f'Ошибка amoCRM API: {e.code}',
                'details': error_body
            })
        }
    
    except urllib.error.URLError as e:
        return {
            'statusCode': 503,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'error': 'Не удалось подключиться к amoCRM',
                'details': str(e.reason)
            })
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'error': 'Внутренняя ошибка сервера',
                'details': str(e)
            })
        }