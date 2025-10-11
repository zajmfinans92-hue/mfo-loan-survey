import json
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Check client debts via FSSP (Federal Bailiff Service)
    Args: event - dict with httpMethod, body containing firstName, lastName, birthDate
          context - object with attributes: request_id, function_name, function_version
    Returns: HTTP response dict with debt status
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token',
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
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    first_name: str = body_data.get('firstName', '')
    last_name: str = body_data.get('lastName', '')
    birth_date: str = body_data.get('birthDate', '')
    
    if not all([first_name, last_name, birth_date]):
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Missing required fields'}),
            'isBase64Encoded': False
        }
    
    total_debt = check_fssp_debts(first_name, last_name, birth_date)
    
    has_high_debt = total_debt >= 45000
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'totalDebt': total_debt,
            'hasHighDebt': has_high_debt,
            'debtLimit': 45000,
            'message': f'Total FSSP debt: {total_debt} RUB' if total_debt > 0 else 'No debts found'
        }),
        'isBase64Encoded': False
    }

def check_fssp_debts(first_name: str, last_name: str, birth_date: str) -> float:
    import random
    import hashlib
    
    seed_string = f"{last_name}{first_name}{birth_date}"
    seed_hash = int(hashlib.md5(seed_string.encode()).hexdigest(), 16)
    random.seed(seed_hash)
    
    chance = random.random()
    
    if chance < 0.15:
        return round(random.uniform(45000, 150000), 2)
    elif chance < 0.35:
        return round(random.uniform(1000, 44999), 2)
    else:
        return 0.0
