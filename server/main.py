from fastapi import FastAPI, Depends, UploadFile, Header
from fastapi.middleware.cors import CORSMiddleware
from tasks import tasks
import ssl

app = FastAPI()
origins = [
        "https://scanner.iith-ac.in:443",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
ssl_context.load_cert_chain('./cert/scanner.iith-ac.in/cert1.pem', keyfile='./cert/scanner.iith-ac.in/privkey1.pem')

@app.get("/")
def posts(user_agent: str = Header(None)):
    print({
        "user_agent": user_agent,
    })
    return {"message": "Hello Bitch, I am Armaan"}

@app.get('/in/{user_id}')
async def user_in(user_id: str):
    modified_user_id = user_id[0:12]
    response = await tasks.handle_user_in(modified_user_id)
    print("Data ready")
    return response

@app.get('/out/{user_id}')
async def user_out(user_id: str):
    modified_user_id = user_id[0:12]
    response = await tasks.handle_user_out(modified_user_id)
    return response

@app.get('/get_all_data')
async def all_data():
    response = await tasks.get_all_data()
    return response



