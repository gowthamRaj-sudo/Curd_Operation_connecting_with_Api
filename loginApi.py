from flask import Flask,request,jsonify
import mysql.connector
from flask_cors import CORS

app=Flask (__name__) #this line  create a class  for flask web application 
# print(app)

CORS(app, origins="http://localhost:3000")
#Db connection
conn=mysql.connector.connect(
    host='localhost',
    user='root',
    password='Password123#@!',
    database='loginPage_db'
)
if conn.is_connected():
    print("Im connected buddy")
else:
    print("not connected")
cursor=conn.cursor()
# print(cursor)



@app.route('/api/createUserdetails',methods=['POST'])#  app decorder  (route means route the api)
def createUserDetails():
    username=request.form['userName']
    password=request.form['passWord']
    sql="insert into loginPageCredintial(UserName,Credintial)values(%s,%s)"
    val=(username,password)
    cursor.execute(sql,val)
    conn.commit()
    return jsonify({"message":'success'})



@app.route('/api/getUserCredintial',methods=['GET'])
def getUserCredintial():
    sql='select * from loginPageCredintial'
    cursor.execute(sql)
    results=cursor.fetchall()
    res=[]
    for i in results:
        id=i[0]
        username=i[1]
        password=i[2]
        res.append({
            "id":id,
            "username":username,
            "password":password
        })
        # print(res)
    return jsonify(res)

# update
@app.route('/api/updateUsersData',methods=['POST'])
def updateUsersData():
    selectedId=request.form['selectedId']
    userName=request.form['UpdateUserName']
    passWord=request.form['UpdatePassWord']
    sql="update loginPageCredintial set UserName=%s,Credintial=%s where Id=%s"
    val=(userName,passWord,selectedId)
    cursor.execute(sql,val)
    conn.commit()
    return jsonify({"message":"success"})


@app.route('/api/deleteLoginRecords',methods=['POST'])
def deleteLoginRecords():
    selectedId=request.args.get('id')
    sql='delete from loginPageCredintial where id=%s'
    val=(selectedId,)
    cursor.execute(sql,val)
    conn.commit()
    return jsonify({"message":"success"})
if __name__ == '__main__': # __name__  and __main__ is  build in python variables 
    app.run()