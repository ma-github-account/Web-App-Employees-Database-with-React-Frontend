This Django application is Employees Database. Application is integrated with AWS. Storage is in S3 service. Database is in RDS service. The application is deployed in AWS infrastructure using Elastic Beanstalk.

The application is available here: https://www.michaldomain2.com/

The folder contains two versions of application: basic one run locally and aws integrated.

1.Basic version

How to run: 
1.pip install -r requirements.txt
2.python manage.py makemigrations 
3.python manage.py migrate 
4.python manage.py runserver

2.Version with AWS integration.

Prerequisites:

- AWS account
- AWS S3 bucket with policy allowing public access
- After creating S3 bucket static files need to be migrated using command: python manage.py collectstatic
- Django Storages (pip install django-storages)
- Boto3 (pip install boto3)
- Psycopg2-binary (pip install psycopg2-binary)
- PostgresSQL database in AWS RDS Service with public access
- Pyyaml and Awsebcli (pip install pyyaml==5.3.1 awsebcli)
- Gunicorn (pip install gunicorn)
- After deploying to Elastic Beanstalk environment variables used in file settings.py need to be added to Elastic - Beanstalk. Variables: SECRET_KEY, NAME, USER, PASSWORD, HOST, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, - AWS_STORAGE_BUCKET_NAME
- In settings.py file parameters ALLOWED_HOSTS and CSRF_TRUSTED_ORIGINS need to be updated to match your host environment

Elastic Beanstalk commands to deploy the application: 1.eb init 2.eb create 3.eb deploy (in case the changes were made and the application needs to be updated in EB)



<img width="1883" height="966" alt="1" src="https://github.com/user-attachments/assets/c381db13-9983-454e-9bba-a907af90d159" />


<img width="1885" height="965" alt="2" src="https://github.com/user-attachments/assets/4d733c22-359a-41ca-8442-793a0da4308c" />



<img width="1881" height="961" alt="3" src="https://github.com/user-attachments/assets/c4d583d1-78ce-4f77-b5d9-3aa2c3bec371" />



<img width="1881" height="963" alt="4" src="https://github.com/user-attachments/assets/b4799429-d2d0-4d22-a154-e09c1c720960" />



<img width="1880" height="967" alt="5" src="https://github.com/user-attachments/assets/6a3efa25-18bc-4e37-b44a-f89eb0f0e793" />



<img width="1870" height="972" alt="6" src="https://github.com/user-attachments/assets/6b17618a-9fb2-4e7e-83ed-e9464ffae45a" />

















