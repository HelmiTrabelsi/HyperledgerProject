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

	"github.com/hyperledger/fabric/core/chaincode/shim"
	sc "github.com/hyperledger/fabric/protos/peer"
)

// Define the Smart Contract structure
type SmartContract2 struct {
}

/* Define Receiver structure, with 8 properties.
Structure tags are used by encoding/json library
*/
type Receiver struct {
	Poids             float64   `json:"Poids"`
	Taille            float64   `json:"Taille"`
	GroupeABO         string    `json:"GroupeABO"`
	StatusVirologique string      `json:"StatusVirologique"`
	DegreDurgence     int       `json:"DegreDurgence"`
	HLA               string    `json:"HLA"`
	DateAjout         time.Time `json:"DateAjout"`
	OrganDemande      string    `json:"OrganDemande"`
	State             string    `json:"State"`
}

/*
 * The Init method *
 called when the Smart Contract "organ-chaincode" is instantiated by the network
 * Best practice is to have any Ledger initialization in separate function
 -- see initLedger()
*/
func (s *SmartContract2) Init(APIstub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}

/*
 * The Invoke method *
 called when an application requests to run the Smart Contract "organ-chaincode"
 The app also specifies the specific smart contract function to call with args
*/
func (s *SmartContract2) Invoke(APIstub shim.ChaincodeStubInterface) sc.Response {

	// Retrieve the requested Smart Contract function and arguments
	function, args := APIstub.GetFunctionAndParameters()
	// Route to the appropriate handler function to interact with the ledger
	if function == "AddReceiver" {
		return s.AddReceiver(APIstub, args)
	} else if function == "GetReceiver" {
		return s.GetReceiver(APIstub, args)
	} else if function == "GetAllReceiver" {
		return s.GetAllReceiver(APIstub)
	} else if function == "ChangeReceiverState" {
		return s.ChangeReceiverState(APIstub, args)
	}
	return shim.Error("Invalid Smart Contract function name.")
}

func (s *SmartContract2) AddReceiver(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 8 {
		return shim.Error("Incorrect number of arguments. Expecting 9")
	}
	
	i, err := strconv.Atoi(args[5])
	f, err := strconv.ParseFloat(args[1], 64)
	e, err := strconv.ParseFloat(args[2], 64)

	ts := time.Now()
	var receiver = Receiver{Poids: f, Taille: e, GroupeABO: args[3], StatusVirologique: args[4], DegreDurgence: i, HLA: args[6], DateAjout: ts, OrganDemande: args[7], State: "En attente"}
	receiverAsBytes, _ := json.Marshal(receiver)
	err = APIstub.PutState(args[0], receiverAsBytes)
	if err != nil {
		return shim.Error(fmt.Sprintf("Failed to record receiver catch: %s", args[0]))
	}

	return shim.Success(nil)
}

func (s *SmartContract2) GetReceiver(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	receiverAsBytes, _ := APIstub.GetState(args[0])
	if receiverAsBytes == nil {
		return shim.Error("Could not locate organ")
	}
	return shim.Success(receiverAsBytes)
}

func (s *SmartContract2) GetAllReceiver(APIstub shim.ChaincodeStubInterface) sc.Response {

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

	fmt.Printf("- GetAllReceiver:\n%s\n", buffer.String())

	return shim.Success(buffer.Bytes())
}
func (s *SmartContract2) ChangeReceiverState(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	receiverAsBytes, _ := APIstub.GetState(args[0])
	if receiverAsBytes == nil {
		return shim.Error("Could not locate receiver")
	}
	receiver := Receiver{}

	json.Unmarshal(receiverAsBytes, &receiver)
	receiver.State = "Servi"
	receiverAsBytes, _ = json.Marshal(receiver)
	err := APIstub.PutState(args[0], receiverAsBytes)
	if err != nil {
		return shim.Error(fmt.Sprintf("Failed to change : %s", args[0]))
	}

	return shim.Success(nil)
}

func main() {

	// Create a new Smart Contract
	err := shim.Start(new(SmartContract2))
	if err != nil {
		fmt.Printf("Error creating new Smart Contract: %s", err)
	}

}
