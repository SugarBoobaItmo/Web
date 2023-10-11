# remove existing deployment
ssh -p 2222 s368982@se.ifmo.ru "rm -rf wildfly/standalone/deployments/lab1-1.0-SNAPSHOT.war"
# add new deployment
scp -P 2222 ./target/lab1-1.0-SNAPSHOT.war s368982@se.ifmo.ru:wildfly/standalone/deployments