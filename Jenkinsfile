pipeline {
  agent any
  environment {
    NX_BASE_BRANCH = "${CHANGE_TARGET}" // Base branch (e.g. main, develop)
    NX_HEAD_BRANCH = "${CHANGE_BRANCH}" // Feature branch (your PR)
  }
  stages {
    stage('Prepare') {
      steps {
        script {
          echo "Base branch: ${env.NX_BASE_BRANCH}"
          echo "Feature branch: ${env.NX_HEAD_BRANCH}"

          // Fetch base branch because Jenkins shallow clones by default
          sh "git fetch origin ${env.NX_BASE_BRANCH}"
        }
      }
    }

    stage('Detect Changed Apps') {
      steps {
        script {
          def changedApps = sh(
            script: "npx nx show projects --affected --base=origin/${env.NX_BASE_BRANCH} --head=HEAD --type=app --plain",
            returnStdout: true
          ).trim()

          if (changedApps) {
            env.CHANGED_APPS = changedApps.split("\n")
          } else {
            env.CHANGED_APPS = []
          }

          echo "Changed apps detected: ${env.CHANGED_APPS}"
        }
      }
    }

//     stage('Build & Test Apps') {
//       when {
//         expression { env.CHANGED_APPS.size() > 0 }
//       }
//       parallel {
//         script {
//           env.CHANGED_APPS.each { app ->
//             stage("Build and Test ${app}") {
//               steps {
//                 sh """
//                   echo "Building app: ${app}"
//                   npx nx run ${app}:build
//
//                   echo "Testing app: ${app}"
//                   npx nx run ${app}:test
//                 """
//               }
//             }
//           }
//         }
//       }
//     }

//     stage('No Apps Changed') {
//       when {
//         expression { env.CHANGED_APPS.size() == 0 }
//       }
//       steps {
//         echo 'No app changes detected. Skipping build and test.'
//       }
//     }
  }
}
