from django.shortcuts import render

# Create your views here.
from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from .models import Restaurant,Commentaire, Produit, Restaurateur,Client
# , Commentaire
from .serializers import VenteSerializer ,CommentaireSerializer,ProduitSerializer


class ListRestaurantView(ListAPIView):
    queryset= Restaurant.objects.all()
    serializer_class= VenteSerializer 

class CreateRestaurantView(CreateAPIView):
    queryset= Restaurant.objects.all()
    serializer_class= VenteSerializer 

class UpdateRestaurantView(UpdateAPIView):
    queryset= Restaurant.objects.all()
    serializer_class= VenteSerializer 

class DeleteRestaurantView(DestroyAPIView):
    queryset= Restaurant.objects.all()
    serializer_class= VenteSerializer 


class ListCommentaireView(ListAPIView):
    queryset= Commentaire.objects.all()
    serializer_class= CommentaireSerializer

class CreateCommentaireView(CreateAPIView):
    queryset= Commentaire.objects.all()
    serializer_class= CommentaireSerializer

class ListProduitView(ListAPIView):
    queryset= Produit.objects.all()
    serializer_class= ProduitSerializer

class CreateProduitView(CreateAPIView):
    queryset= Produit.objects.all()
    serializer_class= ProduitSerializer

class UpdateProduitView(UpdateAPIView): 
    queryset= Produit.objects.all()
    serializer_class= ProduitSerializer

class DeleteProduitView(DestroyAPIView):
    queryset= Produit.objects.all()
    serializer_class= ProduitSerializer 


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Restaurateur

class DeleteRestaurateurView(APIView):
    def delete(self, request, pk):
        try:
            restaurateur = Restaurateur.objects.get(pk=pk)
        except Restaurateur.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        restaurateur.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



from rest_framework import mixins, generics
from .models import Restaurateur
from .serializers import RestaurateurSerializer

class RestaurateurList(mixins.ListModelMixin,
                       generics.GenericAPIView):
    """
    Récupère une liste de tous les restaurateurs enregistrés
    """
    queryset = Restaurateur.objects.all()
    serializer_class = RestaurateurSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)



from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import Produit
from .serializers import ProductSerializer

def ajouter_au_panier(request, produit_id):
    produit = get_object_or_404(Produit, pk=produit_id)
    panier = request.session.get('panier', {})
    quantite = panier.get(str(produit_id), 0)
    panier[str(produit_id)] = quantite + 1
    request.session['panier'] = panier
    return JsonResponse({"success":True}, safe=False)

def supprimer_du_panier(request, produit_id):
    produit = get_object_or_404(Produit, pk=produit_id)
    panier = request.session.get('panier', {})
    if str(produit_id) in panier:
        del panier[str(produit_id)]
        request.session['panier'] = panier
    return JsonResponse({"success":True}, safe=False)


def afficher_panier(request):
    panier = request.session.get('panier', {})
    produits = []
    total = 0
    for produit_id, quantite in panier.items():
        produit = get_object_or_404(Produit, pk=produit_id)
        produits.append({
            'titre': produit.titre,
            'prix': produit.prix,
            'quantite': quantite,
            'total': quantite * produit.prix
        })
        total += quantite * produit.prix
    return JsonResponse({'produits': produits, 'total': total}, safe=False)





from .serializers import ProductSerializer

class ProductSearch(APIView):
    def get(self, request, query):
        products = Produit.objects.filter(titre__icontains=query)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)






from rest_framework import permissions  
from Vente.permissions import IsRestaurateurUser,IsClientUser
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import RestaurateurSignupSerializer,ClientSignupSerializer,UserSerializer

class RestaurateurSignupView(generics.GenericAPIView):
    serializer_class= RestaurateurSignupSerializer
    def post(self, request,*args,**kwargs):
        serializer=self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
        "user":UserSerializer( user, context=self.get_serializer_context()).data,
        "token":Token.objects.get(user=user).key,
        "message":"account create successfuly"
         })

class ClientSignupView(generics.GenericAPIView):
    serializer_class= ClientSignupSerializer
    def post(self, request,*args,**kwargs):
        serializer=self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
        "user":UserSerializer( user, context=self.get_serializer_context()).data,
        "token":Token.objects.get(user=user).key,
        "message":"account create successfuly"
         })
         
       
from django.contrib.auth import authenticate

class CustomAuthToken(ObtainAuthToken):
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            # Les informations d'identification sont valides
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user_id': user.pk,
                'is_Client': user.is_Client
            })
        else:
            # Les informations d'identification ne sont pas valides
            return Response({"detail": "Nom d'utilisateur ou mot de passe incorrect"}, status=400)




class LogoutView(APIView):
    def post(self, request, format=None):
        request.auth.delete()
        return Response(status=status.HTTP_200_OK)




class ClientOnlyView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, IsClientUser]
    serializer_class= UserSerializer

    def get_object(delf):
        return self.request.user



class RestaurateurOnlyView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, IsRestaurateurUser]
    serializer_class= UserSerializer 

    def get_object(delf):
        return self.request.user











