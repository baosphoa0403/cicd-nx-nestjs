pipeline {
  agent any

  tools {
     nodejs "Node.23.8.0" // Name of the Node.js version configured in Jenkins
  }

  stages {
    stage('Prepare') {
      steps {
        script {
          echo "====== Print all ENV ======"

          env.NX_BASE_BRANCH = env.BRANCH_NAME
          env.NX_HEAD_BRANCH = env.BRANCH_NAME

          echo "🚀 Push Build Detected"
          echo "🔹 Base branch: ${env.NX_BASE_BRANCH}"
          echo "🔹 Head branch: ${env.NX_HEAD_BRANCH}"


          sh '''
            echo "📦 Installing dependencies..."
            npm install
          '''

          sh "git fetch origin ${env.NX_BASE_BRANCH}"
        }
      }
    }

    stage('Detect Changed Apps') {
      steps {
        script {
          def changedApps = sh(
            script: "npx nx show projects --affected --base=origin/${env.NX_BASE_BRANCH} --head=HEAD",
            returnStdout: true
          ).trim()

          if (changedApps) {
            env.CHANGED_APPS = changedApps.split("\n")
          } else {
            env.CHANGED_APPS = []
          }

          echo "✅ Changed apps detected: ${env.CHANGED_APPS}"
        }
      }
    }

//     stage('Build & Test Apps') {
//       when {
//         expression { env.CHANGED_APPS.size() > 0 }
//       }
//       steps {
//         script {
//           def apps = env.CHANGED_APPS
//           def branches = [:]
//
//           for (int i = 0; i < apps.size(); i++) {
//             def app = apps[i]
//             branches["Build and Test ${app}"] = {
//               stage("Build and Test ${app}") {
//                 steps {
//                   sh """
//                     echo "Building app: ${app}"
//                     npx nx run ${app}:build
//
//                     echo "Testing app: ${app}"
//                     npx nx run ${app}:test
//                   """
//                 }
//               }
//             }
//           }
//
//           parallel branches
//         }
//       }
//     }

//     stage('No Apps Changed') {
//       when {
//         expression { env.CHANGED_APPS.size() == 0 }
//       }
//       steps {
//         echo 'ℹ️ No app changes detected. Skipping build and test.'
//       }
//     }
  }
}
