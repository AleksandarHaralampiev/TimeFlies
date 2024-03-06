from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class UserAccountManager(BaseUserManager):
    def create_user(self, email, username, password = None):
        if not email:
            raise ValueError("Users must have an email address")

        email = self.normalize_email(email) # #BRyan@gmail.com -> bryan@gmail.com
        user = self.model(email = email, username = username)
        user.set_password(password) # build in function in django to save the password and hash it
        user.save()
        return user
    
    def create_superuser(self, email, username, password=None):

        user = self.create_user(
            email=self.normalize_email(email),
            username=username,
            password=password,
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user
    


class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length = 255, unique = True)
    username = models.CharField(max_length = 255)
    is_active = models.BooleanField(default = True)
    is_staff = models.BooleanField(default = False)

    objects = UserAccountManager()
    USERNAME_FIELD = 'email' # indicating that the email field will be used as the unique identifier for authentication.
    REQUIRED_FIELDS = ['username']

    def get_full_name(self):
        return self.username

    def get_short_name(self):
        return self.username
    
    def __str__(self):
        return self.email