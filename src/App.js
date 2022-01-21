import React, {useEffect, useState} from "react";
import styled from "styled-components";
import axios from 'axios';

const now = Date.now();

export default function Home() {

  const [projects, setProjects] = useState([]);
  const [mxPrice, setMxPrice] = useState(2);
  const [amount, setAmount] = useState(72333);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("https://api.paybook.club:8081/mexc/kick-starters");
      setProjects(res.data.data.filter((item, i) => item.endTime > now).map(item => (
        {
          name: item.profitCurrencyFullName,
          currency: item.profitCurrency,
          icon: `https://www.mexc.com//api/file/download/${item.profitCurrencyIcon}`,
          votes: item.currentVoteQuantity ?? 500,
          totalReward: item.totalSupply,
          price: localStorage.getItem(item.profitCurrency) ?? 0,
        }
      )));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProjects();
    setMxPrice(localStorage.getItem("MX-PRICE"), 2);
    setAmount(72333);
    // const interval = setInterval(fetchProjects, 10000);
    // return () => clearInterval(interval);

  }, []);

  return <Container>
    <Greeting>Hello Shashank, Here are today&apos;s kick-starters</Greeting>
    {projects.map(({name, currency, icon, votes, totalReward, price}, index) =>
      <Row key={currency}>
        <Icon src={icon} alt={name} />
        <Column>
          <Title>{name}</Title>
          <Caption>{`[${currency}]`}</Caption>
          <Label>{votes}</Label>
        </Column>
        <Column>
          <Label>Price</Label>
          <Input value={price} onChange={(e) => {
            const clonedProjects = [...projects];
            clonedProjects[index].price = e.target.value;
            setProjects(clonedProjects)
          }} />
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
      <Input value={amount}  onChange={(e) => setMxPrice(e.target.value)}/>
    </Row>

    <Button onClick={() => {
      projects.forEach(p => localStorage.setItem(p.currency, p.price));
      localStorage.setItem("MX-PRICE", mxPrice);
      localStorage.setItem("AMOUNT", amount);
    }}>
      Save Prices
    </Button>
  </Container>
}

const Container = styled.div`
  padding: 15px;
  border: 2px solid #81C2C0;
  margin: 15px auto;
  border-radius: 10px;
  width: 1000px;
`;

const Greeting = styled.div`
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
