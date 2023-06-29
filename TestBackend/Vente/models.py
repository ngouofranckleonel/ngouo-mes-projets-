from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
# Create your models here.

class User(AbstractUser):
    is_Client = models.BooleanField(default=False)
    is_Restaurateur = models.BooleanField(default=False)
     
    def __str__(self):
        return self.username

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)



# class Restaurateur(models.Model):
#     user=models.OneToOneField(User, related_name="restaurateur", on_delete=models.CASCADE)
#     username = models.CharField(max_length=30, unique=True)
#     phone_number = models.CharField(max_length=15)
#     email = models.EmailField(max_length=255)
#     password = models.CharField(max_length=15)
#     is_active = models.BooleanField(default=True)
#     is_admin = models.BooleanField(default=False)
#     is_Restaurateur = models.BooleanField(default=True)

#     def __str__(self):
#         return self.username


# #### j'ai enlever les autres champs par ce que Restaurateur herite de AbstractUser , donc c'est plus important de les mettre

class Restaurateur(models.Model):
    user = models.OneToOneField(User, related_name="restaurateur", on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15)

    def __str__(self):
        return self.user.username


# class Client(models.Model):
#     user=models.OneToOneField(User, related_name="client", on_delete=models.CASCADE)
#     username = models.CharField(max_length=30, unique=True)
#     email = models.EmailField()
#     password = models.CharField(max_length=15)
#     phone_number = models.CharField(max_length=20)
#     is_active = models.BooleanField(default=True)
#     is_admin = models.BooleanField(default=False)
#     is_Client = models.BooleanField(default=True)
#     is_Restaurateur = models.BooleanField(default=False)

#     def __str__(self):
#         return self.username

# #### j'ai enlever les autres chants par ce que client herite de AbstractUser , donc c'est plus important de les mettre

class Client(models.Model):
    user = models.OneToOneField(User, related_name="client", on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=20)

    def __str__(self):
        return self.user.username






class Restaurant(models.Model):
    Titre = models.CharField(max_length=100)
    siege = models.CharField(max_length=100)
    Image = models.ImageField(upload_to='restaurants/')
    telephone = models.CharField(max_length=20)
    Email = models.EmailField()
    description = models.CharField(max_length=100)
    restaurateur = models.ForeignKey(Restaurateur, on_delete=models.CASCADE)
    def __str__(self):
        return self.Titre


class Produit(models.Model): 
    titre = models.CharField(max_length=200)
    prix = models.FloatField()
    description = models.TextField()
    Restaurant = models.ForeignKey(Restaurant, related_name='restaurant',on_delete = models.CASCADE )
    image = models.ImageField(upload_to='media' , blank=True)
    date_ajout =models.DateTimeField(auto_now=True)
    class Meta:
        ordering = ['-date_ajout']
        
    def __str__(self):
        return self.titre

class Commentaire(models.Model):
    name2 = models.CharField(max_length=30)
    email2 = models.EmailField(blank=True)
    phone2 = models.CharField(max_length=20)
    suject2 = models.CharField(max_length=50)
    description2 = models.TextField(default='votre probleme')

    def __str__(self):
        return f'Commentaire: (self.email2) (self.suject2)'

class Commande(models.Model):
    total =models.CharField(max_length=300)
    nom = models.CharField(max_length=300)
    email = models.EmailField()
    addresse= models.CharField(max_length=300)
    ville = models.CharField(max_length=300)
    pays = models.CharField(max_length=300)
    zipcode= models.CharField(max_length=300)
    date_commande = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date_commande']
    
    def __str__(self):
        return self.nom 

 
# class Client(models.Model):
#     username = models.CharField(max_length=30, unique=True)
#     email = models.EmailField()
#     password = models.CharField(max_length=15)
#     phone_number = models.CharField(max_length=20)
#     is_active = models.BooleanField(default=True)
#     is_admin = models.BooleanField(default=False)
#     is_Client = models.BooleanField(default=True)

#     def __str__(self):
#         return self.username

    