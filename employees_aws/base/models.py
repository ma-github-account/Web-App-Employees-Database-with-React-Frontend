from django.db import models
from django.contrib.auth.models import User


class Employee(models.Model):
    BRANCH_CHOICES = [
        ('Chicago',   'Chicago'),
        ('Amsterdam', 'Amsterdam'),
        ('Bucharest', 'Bucharest'),
    ]
    ENGLISH_CHOICES = [
        ('Weak',          'Weak'),
        ('Communicative', 'Communicative'),
        ('Fluent',        'Fluent'),
    ]

    _id              = models.AutoField(primary_key=True, editable=False)
    user             = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    employee_id      = models.CharField(max_length=70)
    first_name       = models.CharField(max_length=70)
    last_name        = models.CharField(max_length=70)
    company_branch   = models.CharField(max_length=70, choices=BRANCH_CHOICES, blank=True)
    department       = models.CharField(max_length=70, blank=True)
    position         = models.CharField(max_length=70, blank=True)
    personal_phone   = models.CharField(max_length=70, blank=True)
    personal_mail    = models.EmailField(blank=True)
    address          = models.CharField(max_length=200, blank=True)
    date_of_birth    = models.DateField(null=True, blank=True)
    nationality      = models.CharField(max_length=70, blank=True)
    photo            = models.ImageField(upload_to='employee_photos/%Y/%m/%d', blank=True)
    level_of_english = models.CharField(max_length=70, choices=ENGLISH_CHOICES, blank=True)
    native_language  = models.CharField(max_length=70, blank=True)
    createdAt        = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = [('user', 'employee_id')]

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.employee_id})"
