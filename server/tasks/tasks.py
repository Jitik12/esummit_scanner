from .database import make_db
# import gspread
# from oauth2client.service_account import ServiceAccountCredentials

async def handle_user_in(user_id: str):
    connection, cursor = make_db()
    query = f"""select * from ticket_generator where user_id = {user_id}"""
    print(query)
    cursor.execute(query)
    results = cursor.fetchall()
    if results == []:
        print("None")
        return {
            "name": "Not Found",
            "email": "Not Found",
            "phone": "Not Found",
            "status": "Not Found",
        }
    data = results[0]
    print(data)
    """setting the campus_status"""
    query = f"""select * from campus_status where user_id = {user_id}"""
    cursor.execute(query)
    results = cursor.fetchall()
    if results == []:
        query = f"""insert into campus_status values ({user_id}, TRUE)"""
    else :
        query = f"""update campus_status set status = TRUE where user_id = {user_id}"""
    cursor.execute(query)
    connection.commit()
    response = {
        "name": data[1],
        "email": data[2],
        "phone": data[3],
        "status":   "IN",
    }
    return response


async def handle_user_out(user_id: str):
    print("Hello")
    connection, cursor = make_db()
    """setting the campus_status"""
    check_query = f"""select * from ticket_generator where user_id = {user_id}"""
    cursor.execute(check_query)
    results = cursor.fetchall()
    if results == []:
        return {
            "name": "Not Found",
            "email": "Not Found",
            "phone": "Not Found",
            "status": "Not Found",
        }
    results = results[0]
    status = results[1]
    query = f"""select * from ticket_generator where user_id = {user_id}"""
    cursor.execute(query)
    results = cursor.fetchall()
    data = results[0]
    print(data)
    query = f"""update campus_status set status = FALSE where user_id = {user_id}"""
    print(query)
    cursor.execute(query)
    connection.commit()
    response = {
        "name": data[1],
        "email": data[2],
        "phone": data[3],
        "status": "OUT",
    }
    return response

async def get_all_data():
    connection, cursor = make_db()
    query = "select name, email, phone, status from campus_status natural join ticket_generator;"
    cursor.execute(query)
    results = cursor.fetchall()
    connection.commit()
    return results