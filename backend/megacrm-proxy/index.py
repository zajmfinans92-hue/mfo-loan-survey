'''
Business: Proxy для отправки заявок в MegaCRM
Args: event с httpMethod, body (JSON с данными заявки)
Returns: HTTP response с результатом отправки
'''
import json
import urllib.request
import urllib.parse
from typing import Dict, Any
import http.client

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
    
    form_data = {
        'hash': 'gqkx8mmfpd74ezm2',
        'name': body_data.get('name', ''),
        'phone': body_data.get('phone', ''),
        'email': body_data.get('email', ''),
        'comment': body_data.get('comment', '')
    }
    
    params = urllib.parse.urlencode(form_data)
    
    conn = http.client.HTTPSConnection('cp.megacrm.ru')
    conn.request('GET', f'/forms/handler.php?{params}', headers={
        'User-Agent': 'Mozilla/5.0',
        'Accept': '*/*'
    })
    response = conn.getresponse()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({'success': True, 'message': 'Заявка отправлена в MegaCRM'})
    }