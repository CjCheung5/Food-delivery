import {gql,useQuery} from '@apollo/client';
import Dishes from "./dishes"
import {useContext, useState} from 'react';
import { InputGroup, InputGroupAddon,Input} from "reactstrap";


import AppContext from "./context"
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Container,
  Row,
  Col} from "reactstrap";

function RestaurantList(props){
  const[restaurantID, setRestaurantID] = useState(0)
  const {cart } = useContext(AppContext);
  const [state, setState] = useState(cart);
  const [query, setQuery] = useState("");

  const GET_RESTAURANTS = gql`
    query {
      restaurants {
        id
        name
        description
        image {
          url
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_RESTAURANTS)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;
  console.log(`Query Data: ${data.restaurants}`)

 
// definet renderer for Dishes
const renderDishes = (restaurantID, query) => {
  return (<Dishes restId={restaurantID} query={query}> </Dishes>)
};

if(props.search){
  let searchQuery = data.restaurants.filter((res) =>{
    if (res.name.toLowerCase().includes(props.search)){
      return res;
    }
  });

  if(searchQuery.length > 0){
    console.log("query>0")
    const restList = searchQuery.map((res) => (
      <Col xs="6" sm="4" key={res.id}>
        <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
          <CardImg
            top={true}
            style={{ height: 200 }}
            src={
            `http://localhost:1337`+ res.image.url
            }
          />
          <CardBody>
            <CardText>{res.description}</CardText>
          </CardBody>
          <div className="card-footer">
          
          <Button color="info" onClick={()=> setRestaurantID(res.id)}>{res.name}</Button>
           
          </div>
        </Card>
      </Col>
    ))
  
    return(
  
      <Container>
      <Row xs='3'>
        {restList}
      </Row>
      <Row> 
      <InputGroup>
            <InputGroupAddon addonType="append"> Search </InputGroupAddon>
            <Input
                onChange={(e) =>
                setQuery(e.target.value.toLocaleLowerCase())
                }
                value={query}
            />
            </InputGroup>
        </Row>
      <Row xs='3'>
      {renderDishes(restaurantID, query)}
      </Row>
   
      </Container>
   
    )
  } else {
    return <h1>No such restaurant</h1>;
  }

} else{
  const fullRestList = data.restaurants.map((res) => (
    <Col xs="6" sm="4" key={res.id}>
      <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
        <CardImg
          top={true}
          style={{ height: 200 }}
          src={
          `http://localhost:1337`+ res.image.url
          }
        />
        <CardBody>
          <CardText>{res.description}</CardText>
        </CardBody>
        <div className="card-footer">
        
        <Button color="info" onClick={()=> setRestaurantID(res.id)}>{res.name}</Button>
         
        </div>
      </Card>
    </Col>
  ))
  return(
    <>
    <Container>
      <Row xs='3'>
        {fullRestList}
      </Row>
      <Row> 
      <InputGroup>
            <InputGroupAddon addonType="append"> Search </InputGroupAddon>
            <Input
                onChange={(e) =>
                setQuery(e.target.value.toLocaleLowerCase())
                }
                value={query}
            />
            </InputGroup>
        </Row>
      <Row xs='3'>
      {renderDishes(restaurantID, query)}
      </Row>
   
      </Container>
    </>
  )
}

}
   export default RestaurantList