'''
Business: Отправка заявок в MegaCRM через официальный API
Args: event с httpMethod, body (JSON с данными заявки)
Returns: HTTP response с результатом создания лида
'''
import json
import os
import http.client
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
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
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    api_key = os.environ.get('MEGACRM_API_KEY')
    
    if not api_key:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'MEGACRM_API_KEY not configured'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    lead_data = {
        'name': body_data.get('name', ''),
        'phone': body_data.get('phone', ''),
        'email': body_data.get('email', ''),
        'comment': body_data.get('comment', ''),
        'api_key': api_key
    }
    
    print(f'Создание лида в MegaCRM API: name={lead_data["name"]}, phone={lead_data["phone"]}')
    
    json_data = json.dumps(lead_data).encode('utf-8')
    
    conn = http.client.HTTPSConnection('cp.megacrm.ru')
    conn.request('POST', '/api/leads/create', body=json_data, headers={
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': f'Bearer {api_key}'
    })
    
    response = conn.getresponse()
    response_body = response.read().decode('utf-8')
    response_status = response.status
    conn.close()
    
    print(f'Ответ MegaCRM API: status={response_status}, body={response_body}')
    
    if response_status in [200, 201]:
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'success': True, 
                'message': 'Лид успешно создан в MegaCRM',
                'megacrm_response': json.loads(response_body) if response_body else {}
            })
        }
    else:
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'success': False,
                'message': f'Ошибка API MegaCRM: {response_status}',
                'error': response_body
            })
        }