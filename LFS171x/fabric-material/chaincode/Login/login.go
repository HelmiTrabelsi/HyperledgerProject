package main

/* Imports
* 4 utility libraries for handling bytes, reading and writing JSON,
formatting, and string manipulation
* 2 specific Hyperledger Fabric specific libraries for Smart Contracts
*/
import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	sc "github.com/hyperledger/fabric/protos/peer"
)

// Define the Smart Contract structure
type SmartContract3 struct {
}

/* Define Receiver structure, with 8 properties.
Structure tags are used by encoding/json library
*/
type Receiver struct {
	HospitalID   string    `json:"HospitalID"`
	HospitalName string    `json:"HospitalName"`
	Password     string    `json:"Password"`
	City         string    `json:"City"`
	DateAjout    time.Time `json:"DateAjout"`
}
type AB struct {
	ABID      string    `json:"ABID"`
	ABName    string    `json:"ABName"`
	Password  string    `json:"Password"`
	DateAjout time.Time `json:"DateAjout"`
}

/*
 * The Init method *
 called when the Smart Contract "organ-chaincode" is instantiated by the network
 * Best practice is to have any Ledger initialization in separate function
 -- see initLedger()
*/
func (s *SmartContract3) Init(APIstub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}

func (s *SmartContract3) Invoke(APIstub shim.ChaincodeStubInterface) sc.Response {

	// Retrieve the requested Smart Contract function and arguments
	function, args := APIstub.GetFunctionAndParameters()
	// Route to the appropriate handler function to interact with the ledger
	if function == "AddHospital" {
		return s.AddHospital(APIstub, args)
	} else if function == "AddAB" {
		return s.AddAB(APIstub, args)
	} else if function == "GetHospital" {
		return s.GetHospital(APIstub, args)
	} else if function == "GetAB" {
		return s.GetAB(APIstub, args)
	}
	return shim.Error("Invalid Smart Contract function name.")
}
func (s *SmartContract3) AddHospital(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 4 {
		return shim.Error("Incorrect number of arguments. Expecting 9")
	}
	ts := time.Now()
	var receiver = Receiver{HospitalName: args[1], Password: args[2], City: args[3], DateAjout: ts}
	receiverAsBytes, _ := json.Marshal(receiver)
	err := APIstub.PutState(args[1], receiverAsBytes)
	if err != nil {
		return shim.Error(fmt.Sprintf("Failed to record receiver catch: %s", args[0]))
	}

	return shim.Success(nil)
}
func (s *SmartContract3) AddAB(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 3 {
		return shim.Error("Incorrect number of arguments. Expecting 9")
	}
	ts := time.Now()
	var aB = AB{ABName: args[1], Password: args[2], DateAjout: ts}
	ABAsBytes, _ := json.Marshal(aB)
	err := APIstub.PutState(args[1], ABAsBytes)
	if err != nil {
		return shim.Error(fmt.Sprintf("Failed to record receiver catch: %s", args[0]))
	}

	return shim.Success(nil)
}
func (s *SmartContract3) GetHospital(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}
	receiverAsBytes, _ := APIstub.GetState(args[0])
	if receiverAsBytes == nil {
		return shim.Error("Could not locate Hospital")
	}
	return shim.Success(receiverAsBytes)
}
func (s *SmartContract3) GetAB(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}
	ABAsBytes, _ := APIstub.GetState(args[0])
	if ABAsBytes == nil {
		return shim.Error("Could not locate AB")
	}
	return shim.Success(ABAsBytes)
}

func main() {

	// Create a new Smart Contract
	err := shim.Start(new(SmartContract3))
	if err != nil {
		fmt.Printf("Error creating new Smart Contract: %s", err)
	}

}
