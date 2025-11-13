import json
import os
from typing import Dict, Any
from datetime import datetime
import urllib.request
import urllib.error


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Создание сделки в AmoCRM с данными заявки на займ
    Args: event с httpMethod, body (JSON с данными клиента)
          context с request_id
    Returns: HTTP response с ID созданной сделки или ошибкой
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    access_token = os.environ.get('AMOCRM_ACCESS_TOKEN')
    domain = os.environ.get('AMOCRM_DOMAIN')
    
    if not access_token or not domain:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'AmoCRM credentials not configured'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    first_name = body_data.get('firstName', '')
    last_name = body_data.get('lastName', '')
    middle_name = body_data.get('middleName', '')
    phone = body_data.get('phone', '')
    email = body_data.get('email', '')
    loan_amount = body_data.get('loanAmount', 0)
    loan_term = body_data.get('loanTerm', 0)
    birth_date = body_data.get('birthDate', '')
    reg_address = body_data.get('regAddress', '')
    workplace = body_data.get('workplace', '')
    position = body_data.get('position', '')
    monthly_income = body_data.get('monthlyIncome', '')
    
    contact_name = f"{last_name} {first_name} {middle_name}".strip()
    
    contacts_payload = [{
        'name': contact_name,
        'custom_fields_values': []
    }]
    
    if phone:
        contacts_payload[0]['custom_fields_values'].append({
            'field_code': 'PHONE',
            'values': [{'value': phone, 'enum_code': 'WORK'}]
        })
    
    if email:
        contacts_payload[0]['custom_fields_values'].append({
            'field_code': 'EMAIL',
            'values': [{'value': email, 'enum_code': 'WORK'}]
        })
    
    contacts_url = f"https://{domain}/api/v4/contacts"
    contacts_request = urllib.request.Request(
        contacts_url,
        data=json.dumps(contacts_payload).encode('utf-8'),
        headers={
            'Authorization': f'Bearer {access_token}',
            'Content-Type': 'application/json'
        },
        method='POST'
    )
    
    try:
        with urllib.request.urlopen(contacts_request) as response:
            contact_result = json.loads(response.read().decode('utf-8'))
            contact_id = contact_result['_embedded']['contacts'][0]['id']
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        return {
            'statusCode': e.code,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Failed to create contact', 'details': error_body})
        }
    
    lead_name = f"Заявка на займ - {contact_name}"
    lead_description = f"""Дата рождения: {birth_date}
Адрес: {reg_address}
Работа: {workplace}, {position}
Доход: {monthly_income} руб/мес
Срок займа: {loan_term} дней"""
    
    leads_payload = [{
        'name': lead_name,
        'price': loan_amount,
        'custom_fields_values': [],
        '_embedded': {
            'contacts': [{'id': contact_id}]
        }
    }]
    
    leads_payload[0]['custom_fields_values'].append({
        'field_id': 0,
        'values': [{'value': lead_description}]
    })
    
    leads_url = f"https://{domain}/api/v4/leads"
    leads_request = urllib.request.Request(
        leads_url,
        data=json.dumps(leads_payload).encode('utf-8'),
        headers={
            'Authorization': f'Bearer {access_token}',
            'Content-Type': 'application/json'
        },
        method='POST'
    )
    
    try:
        with urllib.request.urlopen(leads_request) as response:
            lead_result = json.loads(response.read().decode('utf-8'))
            lead_id = lead_result['_embedded']['leads'][0]['id']
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'contact_id': contact_id,
                    'lead_id': lead_id,
                    'message': 'Lead created successfully'
                })
            }
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        return {
            'statusCode': e.code,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Failed to create lead', 'details': error_body})
        }
