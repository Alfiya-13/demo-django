from django.db import models
# from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User



# class User(AbstractUser):
#     pass
    


class Todo(models.Model):
    title=models.CharField(max_length=25)
    description=models.TextField(null=True)
    completed=models.BooleanField(default=False)
    created_at=models.DateTimeField(auto_now_add=True)
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    def __str__(self):
        return self.title
    

    