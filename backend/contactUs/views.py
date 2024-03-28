from django.core.mail import send_mail
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def sendEmail(request):
    name = request.data.get('name')
    email = request.data.get('email') 
    message = request.data.get('message')
    recipient_email = 'themastarayt@gmail.com'

    subject = "Message from {}".format(name)
    message_content = "Sender: {}\nEmail: {}\n\n{}".format(name, email, message)

    try:
        send_mail(subject, message_content, email, [recipient_email], fail_silently=False)
        return Response({'message': 'Email sent successfully'})
    except Exception as e:
        return Response({'error': str(e)}, status=500)
