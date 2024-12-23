pipeline {
    agent { label "master" }
    environment {
        DOCKER_API_VERSION = '1.24' // Thay đổi phiên bản API Docker
    }
    stages {
        stage("Build") {
            steps {
                sh """
                  echo "Starting Docker Compose..."
                  docker-compose up -d --build
                """
            }
        }        
    }
    post {
        always {
            script {
                // Thay thế ${TELEGRAM_BOT_TOKEN} và ${CHAT_ID} với giá trị tương ứng của bạn
                sh """
                  curl 'https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=[${env.ENVIRONMENT}] ${env.JOB_NAME} – Build number ${env.BUILD_NUMBER} – ${currentBuild.currentResult}!'
                """
            }
        }
    }
}
