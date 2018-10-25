docker exec -it cli peer chaincode invoke  -C mychannel -n tuna-app -c '{"Args":["AddOrgan", "128", "HR MED T.MAAMOURI NABEUL", "36", "Pancréas" ,"HLA_DP","A+"]}'
docker exec -it cli peer chaincode invoke  -C mychannel -n tuna-app -c '{"Args":["AddOrgan", "256", "HR MENZEL TEMIM", "24", "Reins" ,"HLA_DQ","B+"]}'
docker exec -it cli peer chaincode invoke  -C mychannel -n tuna-app -c '{"Args":["AddOrgan", "369", "HR MAHMOUD ELMATRI ARIANA", "8", "Foie" ,"HLA_A","AB+"]}'
docker exec -it cli peer chaincode invoke  -C mychannel -n tuna-app -c '{"Args":["AddOrgan", "568", "HR DE BEN AROUS", "4", "Coeur" ,"HLA_B","O+"]}'
docker exec -it cli peer chaincode invoke  -C mychannel -n tuna-app -c '{"Args":["AddOrgan", "582", "HR DE MAHRES", "36", "Poumons" ,"HLA_PQ","AB+"]}'
docker exec -it cli peer chaincode invoke  -C mychannel -n tuna-app -c '{"Args":["AddOrgan", "869", "HR MOHAMED BEN SASSI DE GABES", "18", "Coeur" ,"HLA_B","B+"]}'
docker exec -it cli peer chaincode invoke  -C mychannel -n tuna-app -c '{"Args":["AddOrgan", "325", "HR HAJ ALI SOUA KSAR HELLAL", "12", "Foie" ,"HLA_C","O+"]}'
docker exec -it cli peer chaincode invoke  -C mychannel -n tuna-app -c '{"Args":["AddOrgan", "869", "HR DE MOKNINE", "18", "Poumons" ,"HLA_DQ","AB+"]}'
docker exec -it cli peer chaincode invoke  -C mychannel -n tuna-app2 -c '{"Args":["AddReceiver", "9869523", "95.2", "1.96", "AB+" ,"Positive","2","HLA_A","Pancréas"]}'
docker exec -it cli peer chaincode invoke  -C mychannel -n tuna-app2 -c '{"Args":["AddReceiver", "6523698", "75.2", "1.76", "A+" ,"Negative","2","HLA_B","Coeur"]}'
docker exec -it cli peer chaincode invoke  -C mychannel -n tuna-app2 -c '{"Args":["AddReceiver", "2569874", "85.2", "1.98", "B+" ,"Negative","4","HLA_B","Coeur"]}'
docker exec -it cli peer chaincode invoke  -C mychannel -n tuna-app2 -c '{"Args":["AddReceiver", "3598741", "50.2", "1.69", "O+" ,"Negative","3","HLA_DQ","Reins"]}'
docker exec -it cli peer chaincode invoke  -C mychannel -n tuna-app2 -c '{"Args":["AddReceiver", "8459652", "69.2", "1.85", "AB+" ,"Negative","5","HLA_PQ","Poumons"]}'
docker exec -it cli peer chaincode invoke  -C mychannel -n tuna-app2 -c '{"Args":["AddReceiver", "9635471", "89.2", "1.96", "A+" ,"Negative","2","HLA_B","Foie"]}'
docker exec -it cli peer chaincode invoke  -C mychannel -n tuna-app2 -c '{"Args":["AddReceiver", "5698452", "80.2", "1.85", "B+" ,"Negative","3","HLA_B","Pancréas"]}'
docker exec -it cli peer chaincode invoke  -C mychannel -n tuna-app2 -c '{"Args":["AddReceiver", "9828992", "65.5", "1.60", "B+" ,"Negative","6","HLA_B","Reins"]}'
