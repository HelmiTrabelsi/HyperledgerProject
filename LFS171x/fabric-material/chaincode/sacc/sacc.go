// SPDX-License-IDentifier: Apache-2.0

/*
  Sample Chaincode based on Demonstrated Scenario

 This code is based on code written by the Hyperledger Fabric community.
  Original code can be found here: https://github.com/hyperledger/fabric-samples/blob/release/chaincode/fabcar/fabcar.go
*/

package main

/* Imports
* 4 utility libraries for handling bytes, reading and writing JSON,
formatting, and string manipulation
* 2 specific Hyperledger Fabric specific libraries for Smart Contracts
*/
import (
	"bytes"
	"encoding/json"
	"fmt"
	"strconv"
	"time"

	//"time"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	sc "github.com/hyperledger/fabric/protos/peer"
)

// Define the Smart Contract structure
type SmartContract struct {
}

/* Define organ structure, with 4 properties.
Structure tags are used by encoding/json library
*/
type Organ struct {
	Type           string    `json:"type"`
	Timestamp      time.Time `json:"timestamp"`
	HolderHospital string    `json:"HolderHospital"`
	LifeSpan       string    `json:"LifeSpan"`
	Used           string      `json:"used"`
	HLA            string    `json:"HLA"`
	GroupeABO      string    `json:"GroupeABO"`
}

/*
 * The Init method *
 called when the Smart Contract "organ-chaincode" is instantiated by the network
 * Best practice is to have any Ledger initialization in separate function
 -- see initLedger()
*/
func (s *SmartContract) Init(APIstub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}

/*
 * The Invoke method *
 called when an application requests to run the Smart Contract "organ-chaincode"
 The app also specifies the specific smart contract function to call with args
*/
func (s *SmartContract) Invoke(APIstub shim.ChaincodeStubInterface) sc.Response {

	// Retrieve the requested Smart Contract function and arguments
	function, args := APIstub.GetFunctionAndParameters()
	// Route to the appropriate handler function to interact with the ledger
	if function == "GetOrgan" {
		return s.GetOrgan(APIstub, args)
	} else if function == "initLedger" {
		return s.initLedger(APIstub)
	} else if function == "AddOrgan" {
		return s.AddOrgan(APIstub, args)
	} else if function == "GetAllOrgan" {
		return s.GetAllOrgan(APIstub)
	} else if function == "SendOrgan" {
		return s.SendOrgan(APIstub, args)
	} else if function == "GetHistory" {
		return s.GetHistory(APIstub, args)
	} else if function == "OrganAsUsed" {
		return s.OrganAsUsed(APIstub, args)
	}

	return shim.Error("InvalID Smart Contract function name.")
}

/*
 * The GetOrgan method *
Used to view the records of one particular Organ
It takes one argument -- the key for the Organ in question
*/
func (s *SmartContract) GetOrgan(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	organAsBytes, _ := APIstub.GetState(args[0])
	if organAsBytes == nil {
		return shim.Error("Could not locate organ")
	}
	return shim.Success(organAsBytes)
}

/*
 * The initLedger method *
Will add test data (10 organ catches)to our network
*/
func (s *SmartContract) initLedger(APIstub shim.ChaincodeStubInterface) sc.Response {

	organ := []Organ{
		//Organ{ID: "222", HolderHospital: "nabeul", LifeSpan: "36", Type: "foie", Used: f},
		//Organ{ID: "333", HolderHospital: "Tunis", LifeSpan: "48", Type: "coeur", Used: t},
	}

	i := 0
	for i < len(organ) {
		fmt.Println("i is ", i)
		organAsBytes, _ := json.Marshal(organ[i])
		APIstub.PutState(strconv.Itoa(i+1), organAsBytes)
		fmt.Println("Added", organ[i])
		i = i + 1
	}

	return shim.Success(nil)
}

/*
 * The AddOrgan method *

This method takes in five arguments (attributes to be saved in the ledger).
*/
func (s *SmartContract) AddOrgan(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 6 {
		return shim.Error("Incorrect number of arguments. Expecting 4")
	}
	
	ts := time.Now()

	var organ = Organ{HolderHospital: args[1], Timestamp: ts, LifeSpan: args[2], Type: args[3], Used: "Disponible", HLA: args[4], GroupeABO: args[5]}

	organAsBytes, _ := json.Marshal(organ)
	err := APIstub.PutState(args[0], organAsBytes)
	if err != nil {
		return shim.Error(fmt.Sprintf("Failed to record organ catch: %s", args[0]))
	}

	return shim.Success(nil)
}

/*func (s *SmartContract) AddOrgan(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 6 {
		return shim.Error("Incorrect number of arguments. Expecting ")
	}

	var organ = Organ{HolderHospital: args[1], Timestamp: args[2], LifeSpan: args[3], Type: args[4], Used: args[5]}

	tunaAsBytes, _ := json.Marshal(organ)
	err := APIstub.PutState(args[0], tunaAsBytes)
	if err != nil {
		return shim.Error(fmt.Sprintf("Failed to record tuna catch: %s", args[0]))
	}

	return shim.Success(nil)
}*/

/*
 * The GetAllOrgan method *

This method does not take any arguments. Returns JSON string containing results.
*/
func (s *SmartContract) GetAllOrgan(APIstub shim.ChaincodeStubInterface) sc.Response {

	startKey := "0"
	endKey := "999"

	resultsIterator, err := APIstub.GetStateByRange(startKey, endKey)
	if err != nil {
		return shim.Error(err.Error())
	}
	defer resultsIterator.Close()

	// buffer is a JSON array containing QueryResults
	var buffer bytes.Buffer
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}
		// Add comma before array members,suppress it for the first array member
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		buffer.WriteString("{\"Key\":")
		buffer.WriteString("\"")
		buffer.WriteString(queryResponse.Key)
		buffer.WriteString("\"")

		buffer.WriteString(", \"Record\":")
		// Record is a JSON object, so we write as-is
		buffer.WriteString(string(queryResponse.Value))
		buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")

	fmt.Printf("- GetAllOrgan:\n%s\n", buffer.String())

	return shim.Success(buffer.Bytes())
}

/*
 * The SendOrgan method *

This function takes in 2 arguments, organ ID and new holder name.
*/
func (s *SmartContract) SendOrgan(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 2 {
		return shim.Error("Incorrect number of arguments. Expecting 2")
	}

	organAsBytes, _ := APIstub.GetState(args[0])
	if organAsBytes == nil {
		return shim.Error("Could not locate organ")
	}
	organ := Organ{}

	json.Unmarshal(organAsBytes, &organ)
	// Normally check that the specified argument is a valID holder of organ
	// we are skipping this check for this example
	organ.HolderHospital = args[1]

	organAsBytes, _ = json.Marshal(organ)
	err := APIstub.PutState(args[0], organAsBytes)
	if err != nil {
		return shim.Error(fmt.Sprintf("Failed to change organ holder: %s", args[0]))
	}

	return shim.Success(nil)
}

func (s *SmartContract) GetHistory(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {
	type AuditHistory struct {
		TxId  string `json:"txId"`
		Value Organ  `json:"value"`
	}
	var history []AuditHistory
	var organ Organ

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	organId := args[0]
	fmt.Printf("- start getHistoryForMarble: %s\n", organId)

	// Get History
	resultsIterator, err := APIstub.GetHistoryForKey(organId)
	if err != nil {
		return shim.Error(err.Error())
	}
	defer resultsIterator.Close()

	for resultsIterator.HasNext() {
		historyData, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}

		var tx AuditHistory
		tx.TxId = historyData.TxId                //copy transaction id over
		json.Unmarshal(historyData.Value, &organ) //un stringify it aka JSON.parse()
		if historyData.Value == nil {             //marble has been deleted
			var emptyOrgan Organ
			tx.Value = emptyOrgan //copy nil marble
		} else {
			json.Unmarshal(historyData.Value, &organ) //un stringify it aka JSON.parse()
			tx.Value = organ                          //copy marble over
		}
		history = append(history, tx) //add this tx to the list
	}
	fmt.Printf("- getHistoryForOrgan returning:\n%s", history)

	//change to array of bytes
	historyAsBytes, _ := json.Marshal(history) //convert to array of bytes
	return shim.Success(historyAsBytes)
}
func (s *SmartContract) OrganAsUsed(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 5")
	}

	organAsBytes, _ := APIstub.GetState(args[0])
	if organAsBytes == nil {
		return shim.Error("Could not locate organ")
	}
	organ := Organ{}

	json.Unmarshal(organAsBytes, &organ)
	organ.Used = "Utilisé"
	organAsBytes, _ = json.Marshal(organ)
	err := APIstub.PutState(args[0], organAsBytes)
	if err != nil {
		return shim.Error(fmt.Sprintf("Failed to change : %s", args[0]))
	}

	return shim.Success(nil)
}

/*
 * main function *
calls the Start function
The main function starts the chaincode in the container during instantiation.
*/
func main() {

	// Create a new Smart Contract
	err := shim.Start(new(SmartContract))
	if err != nil {
		fmt.Printf("Error creating new Smart Contract: %s", err)
	}
}
