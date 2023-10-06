# remove existing deployment
ssh -p 2222 s368982@se.ifmo.ru "rm -rf wildfly/wildfly-21.0.0.Final/standalone/deployments/lab1-1.0-SNAPSHOT.war"
# add new deployment
scp -P 2222 ./target/lab1-1.0-SNAPSHOT.war s368982@se.ifmo.ru:wildfly/wildfly-21.0.0.Final/standalone/deployments