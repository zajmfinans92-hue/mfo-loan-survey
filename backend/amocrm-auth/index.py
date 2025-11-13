import json
import os
from typing import Dict, Any
import urllib.request
import urllib.error


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Обмен кода авторизации AmoCRM на access_token и refresh_token
    Args: event с httpMethod, body (authorization_code, client_id, client_secret, redirect_uri)
    Returns: HTTP response с токенами доступа
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
    
    body_data = json.loads(event.get('body', '{}'))
    
    domain = body_data.get('domain')
    client_id = body_data.get('client_id')
    client_secret = body_data.get('client_secret')
    redirect_uri = body_data.get('redirect_uri')
    grant_type = body_data.get('grant_type', 'authorization_code')
    
    if grant_type == 'authorization_code':
        code = body_data.get('code')
        if not all([domain, client_id, client_secret, redirect_uri, code]):
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'error': 'Missing required fields',
                    'required': ['domain', 'client_id', 'client_secret', 'redirect_uri', 'code']
                })
            }
        
        payload = {
            'client_id': client_id,
            'client_secret': client_secret,
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': redirect_uri
        }
    
    elif grant_type == 'refresh_token':
        refresh_token = body_data.get('refresh_token')
        if not all([domain, client_id, client_secret, redirect_uri, refresh_token]):
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'error': 'Missing required fields',
                    'required': ['domain', 'client_id', 'client_secret', 'redirect_uri', 'refresh_token']
                })
            }
        
        payload = {
            'client_id': client_id,
            'client_secret': client_secret,
            'grant_type': 'refresh_token',
            'refresh_token': refresh_token,
            'redirect_uri': redirect_uri
        }
    
    else:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Invalid grant_type. Use "authorization_code" or "refresh_token"'})
        }
    
    url = f"https://{domain}/oauth2/access_token"
    
    request = urllib.request.Request(
        url,
        data=json.dumps(payload).encode('utf-8'),
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    
    try:
        with urllib.request.urlopen(request) as response:
            result = json.loads(response.read().decode('utf-8'))
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'access_token': result.get('access_token'),
                    'refresh_token': result.get('refresh_token'),
                    'token_type': result.get('token_type'),
                    'expires_in': result.get('expires_in'),
                    'message': 'Сохраните эти токены в секретах: AMOCRM_ACCESS_TOKEN и AMOCRM_REFRESH_TOKEN'
                })
            }
    
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        return {
            'statusCode': e.code,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'error': 'Failed to get tokens',
                'details': error_body,
                'hint': 'Проверьте правильность client_id, client_secret и кода авторизации'
            })
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }
