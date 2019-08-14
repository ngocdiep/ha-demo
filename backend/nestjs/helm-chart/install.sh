git clone diepnguyen@192.168.1.233:/media/diepnguyen/Dev/Projects/Infrastructure/apps/ha-demo
cd ha-demo/backend/nestjs && docker build . -t ngocdiep02tk/ha-demo-fe:v1.0
helm install helm-chart ha-demo-be --name ha-demo-be --namespace demo
kubectl patch -n demo pg/ha-demo-db -p '{"spec":{"terminationPolicy":"WipeOut"}}' --type="merge"
helm delete ha-demo-be --purge
kubectl delete -n demo pg/ha-demo-db