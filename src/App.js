import React, {useEffect, useState} from "react";
import styled from "styled-components";
import axios from 'axios';

export default function Home() {

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mxPrice, setMxPrice] = useState(localStorage.getItem("MX-PRICE") ?? 1.76);
  const [amount, setAmount] = useState(localStorage.getItem("AMOUNT") ?? 75000);

  const fetchProjects = async () => {
    const res = await axios.get("https://api.paybook.club:8085/mexc/kick-starters?count=10");
    setProjects(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return <Container>
    <KickStarters>
      <Header>kick-starters</Header>

      {loading
        ? <Title>Loading... Please wait</Title>
        : projects.map(({name, currency, icon, votes, totalReward, price}) =>
          <Row key={currency}>
            <Icon src={icon} alt={name} />
            <Column>
              <Title>{name}</Title>
              <Caption>{`[${currency}]`}</Caption>
              <Label>{`$${price}`}</Label>
            </Column>
            <Column>
              <Label>Reward</Label>
              <Title>{`₹${((totalReward * price) / (mxPrice * votes)) * amount}`}</Title>
            </Column>
          </Row>
        )}

      <Row>
        <Label>Mx Price</Label>
        <Input value={mxPrice} onChange={(e) => setMxPrice(e.target.value)} />
      </Row>

      <Row>
        <Label>Investment</Label>
        <Input value={amount} onChange={(e) => setAmount(e.target.value)} />
      </Row>

      <Button onClick={() => {
        localStorage.setItem("MX-PRICE", mxPrice);
        localStorage.setItem("AMOUNT", amount);
      }}>
        Save Prices
      </Button>
    </KickStarters>
    <Divider/>
    <Defis>
      <Header>DeFis</Header>
    </Defis>
  </Container>
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 15px;
`;

const KickStarters = styled.div`
  flex:1;
`;

const Defis = styled.div`
  flex:1;
`;

const Divider=styled.div`
border-left: 1px solid gainsboro;
`;

const Header = styled.div`
  font-family: "Manrope",sans-serif;
  font-style: normal;
  font-weight: 600;
  text-align: center;
  font-size: 40px;
  color: #81C2C0;
  margin-bottom: 20px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 32px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  min-width: 200px;
`;

const Icon = styled.img`
  width:50px;
  height:50px;
  border-radius: 50px;
`;

const Title = styled.div`
  font-family: "Manrope",sans-serif;
  font-style: normal;
  font-size: 20px;
  font-weight: normal;
  color: #16b979;
`;

const Caption = styled.div`
  font-family: "Manrope",sans-serif;
  font-style: normal;
  font-size: 16px;
  font-weight: 700;
  color: #151617;
`;

const Label = styled.div`
  font-family: "Manrope",sans-serif;
  font-style: normal;
  font-size: 14px;
  font-weight: 700;
  color: #151617;
`;

const Input = styled.input`
  font-family: "Manrope",sans-serif;
  font-style: normal;
  font-size: 16px;
  font-weight: 700;
  color: #151617;
`;

const Button = styled.button`
    min-width: 160px;
    height: 50px;
    background: ${props => props.background ?? '#81C2C0'};
    opacity: ${props => props.disabled ? 0.25 : 1};
    border: ${props => `1px solid ${props.background ?? '#81C2C0'}`};
    border-radius: 5px;
    font-family: 'Barlow Condensed', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    color: #FFFFFF;
`;
