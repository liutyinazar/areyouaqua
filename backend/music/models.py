from django.db import models


class Track(models.Model):
    title = models.CharField(max_length=80)
    release_data = models.DateField()
    uri = models.TextField(unique=True) # url for track or album

