from django.db import models
import uuid
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

class UsersTable(AbstractUser):
    """User authentication data table"""
    id=models.UUIDField(null=False,default=uuid.uuid4,primary_key=True,db_index=True)
    emailVerified=models.BooleanField(default=False)
    profileImage=models.BinaryField(null=True,blank=True)

    class Meta:
        db_table="UsersTable"

class WABApps(models.Model):
    id=models.UUIDField(null=False,default=uuid.uuid4,primary_key=True,db_index=True)
    name=models.CharField(max_length=64,null=False)
    owner=models.UUIDField(null=False,db_index=True)
    wab_version=models.CharField(max_length=8,null=False)
    added_on=models.DateTimeField(default=timezone.now)
    available=models.BooleanField(default=True)

    class Meta:
        db_table="WABApps"


class WABPages(models.Model):
    id=models.UUIDField(null=False,default=uuid.uuid4,primary_key=True,db_index=True)
    name=models.CharField(max_length=32,null=False)
    appID=models.UUIDField(null=False,db_index=True)
    appPageID=models.BigIntegerField(null=False)
    html_content=models.CharField(max_length=4000,null=True,blank=True)
    js_content=models.CharField(max_length=4000,null=True,blank=True)
    added_on=models.DateTimeField(default=timezone.now)
    available=models.BooleanField(default=True)

    class Meta:
        db_table="WABPages"

class AppSettings(models.Model):
    name=models.CharField(max_length=32)
    value=models.CharField(max_length=128,null=True)
    class Meta:
        db_table="AppSettings"

class WABPagesTemplates(models.Model):
    html_content=models.CharField(max_length=4000,null=True,blank=True)
    js_content=models.CharField(max_length=4000,null=True,blank=True)
    class Meta:
        db_table="WABPagesTemplates"