from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from base.models import Employee
from base.serializers import EmployeeSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getEmployees(request):
    employees = Employee.objects.filter(user=request.user).order_by('-createdAt')
    serializer = EmployeeSerializer(employees, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getEmployeeById(request, pk):
    try:
        employee = Employee.objects.get(_id=pk)
    except Employee.DoesNotExist:
        return Response({'detail': 'Employee not found'}, status=status.HTTP_404_NOT_FOUND)

    if employee.user != request.user:
        return Response({'detail': 'Not authorized to view this employee'}, status=status.HTTP_403_FORBIDDEN)

    serializer = EmployeeSerializer(employee, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createEmployee(request):
    # DRF 3.15+ returns _full_data (text + files) from request.data, so .dict()
    # includes uploaded file objects. We strip 'photo' here and handle it
    # separately after save to avoid ImageField validation on a file whose
    # read-pointer may have been advanced during multipart parsing.
    data = request.data.dict()
    data.pop('photo', None)
    data['user'] = request.user.id
    serializer = EmployeeSerializer(data=data)
    if serializer.is_valid():
        employee = serializer.save()
        if 'photo' in request.FILES:
            employee.photo = request.FILES['photo']
            employee.save()
        return Response(EmployeeSerializer(employee).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateEmployee(request, pk):
    try:
        employee = Employee.objects.get(_id=pk)
    except Employee.DoesNotExist:
        return Response({'detail': 'Employee not found'}, status=status.HTTP_404_NOT_FOUND)

    if employee.user != request.user:
        return Response({'detail': 'Not authorized to update this employee'}, status=status.HTTP_403_FORBIDDEN)

    serializer = EmployeeSerializer(employee, data=request.data, partial=True)
    if serializer.is_valid():
        employee = serializer.save()
        if 'photo' in request.FILES:
            employee.photo = request.FILES['photo']
            employee.save()
        return Response(EmployeeSerializer(employee).data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteEmployee(request, pk):
    try:
        employee = Employee.objects.get(_id=pk)
    except Employee.DoesNotExist:
        return Response({'detail': 'Employee not found'}, status=status.HTTP_404_NOT_FOUND)

    if employee.user != request.user:
        return Response({'detail': 'Not authorized to delete this employee'}, status=status.HTTP_403_FORBIDDEN)

    employee.delete()
    return Response({'detail': 'Employee deleted successfully'})
