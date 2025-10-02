import json
import os
from typing import Dict, Any
import urllib.request
import urllib.error

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Отправка заявок из формы в amoCRM
    Args: event - dict с httpMethod, body, queryStringParameters
          context - объект с атрибутами: request_id, function_name
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
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
    
    amocrm_domain = os.environ.get('AMOCRM_DOMAIN')
    access_token = os.environ.get('AMOCRM_ACCESS_TOKEN')
    
    if not amocrm_domain or not access_token:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'amoCRM credentials not configured'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    name = body_data.get('name', '')
    phone = body_data.get('phone', '')
    email = body_data.get('email', '')
    amount = body_data.get('amount', 0)
    period = body_data.get('period', 0)
    
    lead_data = {
        'name': f'Заявка на займ: {name}',
        'price': amount,
        '_embedded': {
            'contacts': [{
                'first_name': name,
                'custom_fields_values': [
                    {
                        'field_code': 'PHONE',
                        'values': [{'value': phone, 'enum_code': 'WORK'}]
                    },
                    {
                        'field_code': 'EMAIL',
                        'values': [{'value': email, 'enum_code': 'WORK'}]
                    }
                ]
            }]
        },
        'custom_fields_values': [
            {
                'field_name': 'Сумма займа',
                'values': [{'value': amount}]
            },
            {
                'field_name': 'Срок займа',
                'values': [{'value': f'{period} дней'}]
            }
        ]
    }
    
    api_url = f'https://{amocrm_domain}/api/v4/leads/complex'
    
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
    
    request_data = json.dumps([lead_data]).encode('utf-8')
    req = urllib.request.Request(api_url, data=request_data, headers=headers, method='POST')
    
    response = urllib.request.urlopen(req)
    response_data = json.loads(response.read().decode('utf-8'))
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'isBase64Encoded': False,
        'body': json.dumps({
            'success': True,
            'lead_id': response_data[0]['id'] if response_data else None,
            'message': 'Заявка успешно отправлена в amoCRM'
        })
    }
