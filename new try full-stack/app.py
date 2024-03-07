from flask import Flask , render_template , jsonify ,request
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from datetime import date

uri ='' #your mango db uri
client = MongoClient(uri, server_api=ServerApi('1'))
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

db=client.eventify

app=Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route ('/add_event', methods=['GET'])
def add():
    e_list=list(db.events.find({},{'_id':False}))
    e_lis=[]
    toda=date.today()
    today=toda.strftime("%Y-%m-%d")

    for i in range (0,len(e_list)):
        if today > e_list[i]['date']:
            db.events.delete_one(e_list[i])
        else:
            e_lis.append(e_list[i])
    
        

    return jsonify ({'events':e_lis})

@app.route('/add_event',methods=['POST'])
def fetchfd():
    e_name=request.form['name']
    e_des=request.form['des']
    e_date=request.form['date']
    e_time=request.form['time']
    e_poster=request.form['poster']
    e_loc=request.form['loc']
    e_mail=request.form['mail']
    e_details={'name': e_name,
               'des': e_des,
               'date':e_date,
               'time':e_time,
               'poster':e_poster,
               'loc':e_loc,
               'mail':e_mail}
    for key, value in e_details.items():
            if not value.strip():  # Check if value is empty or only whitespace
                return jsonify({'msg': 'Please fill in all details'})  # Return error response if any detail is empty
    
    # If all details are filled, proceed to insert into the database
    db.events.insert_one(e_details)
    return jsonify({'msg': 'Event details added successfully'}) 

if __name__ == ('__main__'):
    app.run(debug=True)