from datetime import datetime
from config import app, db
from models import Task
from flask import request, jsonify

@app.route('/tasks', methods=['GET'])
def get_tasks():
    try:
        tasks = Task.query.order_by(Task.expectedDate.asc()).all()
        return jsonify([task.to_json() for task in tasks])
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/tasks', methods=['POST'])
def create_task():
    try:
        data = request.get_json()
        required_fields = ['title', 'status', 'expectedDate', 'description']
        missing = [field for field in required_fields if not data.get(field)]
        if missing:
            return jsonify({"error": f"Required fields missing: {', '.join(missing)}"}), 400
        
        #converte a string de tempo em data
        expected_date = None 
        expected_date = datetime.strptime(data['expectedDate'], "%Y-%m-%d")

        new_task = Task(
            title=data['title'],
            description=data.get('description'),
            status=data.get('status'),
            expectedDate=expected_date
        )
        db.session.add(new_task)
        db.session.commit()
        return jsonify(new_task.to_json()), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/tasks/<int:task_id>/status', methods=['PUT'])
def update_task_status(task_id):
    try:
        data = request.get_json()
        
        if not data.get('status'):
            return jsonify({"error": "Status field is required"}), 400
        
        valid_status = ['pending', 'doing', 'done']
        if data['status'] not in valid_status:
            return jsonify({"error": f"Invalid status. Must be one of: {', '.join(valid_status)}"}), 400
    
        task = Task.query.get(task_id)
        if not task:
            return jsonify({"error": "Task not found"}), 404

        task.status = data['status']
        db.session.commit()
        
        return jsonify(task.to_json()), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    try:
        task = Task.query.get(task_id)
        
        if not task:
            return jsonify({"error": "Task not found"}), 404
        
        db.session.delete(task)
        db.session.commit()

        return jsonify({"message": "Task deleted successfully"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/tasks/deleteAllDone', methods=['DELETE'])
def delete_done_tasks():
    try:
        deleted = Task.query.filter_by(status="done").delete()
        db.session.commit()
        return jsonify({"deleted": deleted}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)