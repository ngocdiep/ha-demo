* Install in k8s cluster:
    Pre-required: Kubedb for PostgreSQL, helm is installed in the k8s cluster

    1. Install backend
        1.1. change directory to backend/nestjs
        $cd backend/nestjs

        1.2. Build docker image:
        $docker build . -t <username>/ha-demo-be:v1.0

        1.3. Push docker image:
        $docker push <username>/ha-demo-be:v1.0

        1.4. Update helm chart values in /backend/nestjs/helm-chart:
        - In values.yaml, update repository name to <username>/ha-demo-be:v1.0
        - In postgres-crd.yaml, storage-pvc.yaml, update storageClassName that k8s-cluster is using, example: cephfs

        1.5. Install backend by helm:
        $helm install helm-chart/ha-demo-be --name ha-demo-be --namespace demo


    2. Install frontend
        2.1. Change directory to frontend/angular
        2.2. Build docker image:
        $docker build . -t <username>/ha-demo-fe:v1.0

        2.3. Push docker image:
        $docker push <username>/ha-demo-fe:v1.0

        2.4. Update helm chart values in /backend/nestjs/helm-chart:
        - In values.yaml, update repository name to <username>/ha-demo-fe:v1.0

        2.5. Install frontend by helm:
        $helm install helm-chart/ha-demo-fe --name ha-demo-fe --namespace demo


    * Cleaning up:
        + Backend:
            $kubectl patch -n demo pg/ha-demo-db -p '{"spec":{"terminationPolicy":"WipeOut"}}' --type="merge"
            $helm delete ha-demo-be --purge

        + Frontend:
            $helm delete ha-demo-fe --purge