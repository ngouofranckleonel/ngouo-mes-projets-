# import serializers from the REST framework
from rest_framework import serializers
from Vente.models import User, Restaurateur,Client ,Restaurant,Commentaire, Produit
 

# from django.contrib.auth.models import User

from rest_framework import serializers, validators




class VenteSerializer(serializers.ModelSerializer):
 
    # create a meta class
    class Meta:
        model = Restaurant
        fields = ('Titre','siege', 'Image','telephone','Email','description','restaurateur')

class CommentaireSerializer(serializers.ModelSerializer):
    class Meta:
        model= Commentaire
        fields = ('name2','email2','phone2','suject2','description2')

class ProduitSerializer(serializers.ModelSerializer):
    class Meta:
        model= Produit
        fields =('titre','prix','Restaurant','image','date_ajout')




# serializers.py



class RestaurateurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurateur
        fields = ('username', 'email', 'password', 'phone_number')







class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produit
        fields = '__all__'





class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['username','email', 'is_Client'] 




class RestaurateurSignupSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={"input_type": "password"}, write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        # Supprimer le champ 'password2' des données validées
        password2 = validated_data.pop('password2', None)
        # Vérifier si les mots de passe correspondent
        if validated_data['password'] != password2:
            raise serializers.ValidationError({"error": "les mots de passe ne correspondent pas"})
        # Appeler la méthode create parente avec les données validées modifiées
        user = super().create(validated_data)
        # Définir le mot de passe de l'utilisateur
        user.set_password(validated_data['password'])
        user.is_Restaurateur = True
        user.save()
        Restaurateur.objects.create(user=user)
        return user


class ClientSignupSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={"input_type": "password"}, write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        # Supprimer le champ 'password2' des données validées
        password2 = validated_data.pop('password2', None)
        # Vérifier si les mots de passe correspondent
        if validated_data['password'] != password2:
            raise serializers.ValidationError({"error": "les mots de passe ne correspondent pas"})
        # Appeler la méthode create parente avec les données validées modifiées
        user = super().create(validated_data)
        # Définir le mot de passe de l'utilisateur
        user.set_password(validated_data['password'])
        user.is_Client = True
        user.save()
        Client.objects.create(user=user)
        return user