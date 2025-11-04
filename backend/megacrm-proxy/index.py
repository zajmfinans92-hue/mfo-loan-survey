'''
Business: Отправка заявок в MegaCRM через веб-форму
Args: event с httpMethod, body (JSON с данными заявки)
Returns: HTTP response с результатом отправки
'''
import json
import http.client
import urllib.parse
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
    
    body_data = json.loads(event.get('body', '{}'))
    
    form_fields = []
    
    if body_data.get('name'):
        form_fields.append({
            'name': 'name',
            'value': body_data['name']
        })
    
    if body_data.get('phone'):
        form_fields.append({
            'name': 'phone',
            'value': body_data['phone']
        })
    
    if body_data.get('email'):
        form_fields.append({
            'name': 'email',
            'value': body_data['email']
        })
    
    if body_data.get('comment'):
        form_fields.append({
            'name': 'comment',
            'value': body_data['comment']
        })
    
    payload = {
        'hash': 'gqkx8mmfpd74ezm2',
        'fields': form_fields
    }
    
    print(f'📤 Отправка заявки в MegaCRM')
    print(f'   Данные: {json.dumps(payload, ensure_ascii=False)}')
    
    json_data = json.dumps(payload)
    
    conn = http.client.HTTPSConnection('cp.megacrm.ru')
    conn.request('POST', '/forms/handler.php', body=json_data, headers={
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json'
    })
    
    response = conn.getresponse()
    response_body = response.read().decode('utf-8', errors='ignore')
    response_status = response.status
    conn.close()
    
    print(f'✅ Ответ от MegaCRM: HTTP {response_status}')
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({
            'success': True,
            'message': 'Заявка отправлена в MegaCRM',
            'http_status': response_status
        })
    }