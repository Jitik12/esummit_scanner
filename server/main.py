from fastapi import FastAPI, Depends, UploadFile, Header
from fastapi.middleware.cors import CORSMiddleware
from tasks import tasks


app = FastAPI()
origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
    return response


@app.get('/out/{user_id}')
async def user_out(user_id: str):
    modified_user_id = user_id[0:12]
    response = await tasks.handle_user_out(modified_user_id)
    return response



