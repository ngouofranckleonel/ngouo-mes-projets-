from rest_framework.permissions import BasePermission


class IsClientUser(BasePermission):
    def has_permission(self, request, view):
        # super().has_permission(request, view)
        return bool(request.user and request.user.is_Client)


class IsRestaurateurUser(BasePermission):
    def has_permission(self, request, view):
        # super().has_permission(request, view)
        return bool(request.user and request.user.is_Restaurateur)