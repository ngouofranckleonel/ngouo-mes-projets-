from django.urls import path
from . import views 
# from knox import views as knox_views
# from django.urls import path
from .views import RestaurateurList,DeleteRestaurateurView, ProductSearch, ClientSignupView,RestaurateurSignupView,CustomAuthToken,RestaurateurOnlyView,ClientOnlyView,LogoutView
# ,Clientregister,Clientlogin,Clientreset_password
urlpatterns = [
    path('',views.ListRestaurantView.as_view(), name='resto'),
    path('add_resto/',views.CreateRestaurantView.as_view(), name='create_resto'),
    path('<pk>/update_resto/',views.UpdateRestaurantView.as_view(), name='resto_update'),
    path('<pk>/delete_resto/',views.DeleteRestaurantView.as_view(), name='resto_delete'),
    path('commentaire/',views.ListCommentaireView.as_view(), name='commentaire'),
    path('add_commentaire/',views.CreateCommentaireView.as_view(), name='create_commentaire'),
    path('produit/',views.ListProduitView.as_view(), name='produit'),
    path('add_produit/',views.CreateProduitView.as_view(), name='create_produit'),
    path('<pk>/update_produit/',views.UpdateProduitView.as_view(), name='produit_update'),
    path('<pk>/delete_produit/',views.DeleteProduitView.as_view(), name='produit_delete'),



    path('registerClt/', ClientSignupView.as_view(), name='login'),
    path('register/restaurateur', RestaurateurSignupView.as_view(), name='restaurateur-create'),
    path('login/', CustomAuthToken.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('Restaurateur/dashboard', RestaurateurOnlyView.as_view(), name='resto-dashbord'),
    path('Client/dashbord', ClientOnlyView.as_view(), name='client-dashbord'),



    path('restaurateurs/', RestaurateurList.as_view(), name='restaurateur-list'),
    path('restaurateur/<int:pk>/delete/', DeleteRestaurateurView.as_view(), name='delete_restaurateur'),
    path('panier/ajouter/<int:produit_id>/', views.ajouter_au_panier),
    path('panier/supprimer/<int:produit_id>/', views.supprimer_du_panier),
    path('cart/', views.afficher_panier),
    path('api/search/<str:query>/', ProductSearch.as_view(), name='search')


]
