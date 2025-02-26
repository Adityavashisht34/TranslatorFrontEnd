import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Container, Typography, Grid, Paper, Button } from '@mui/material';
import { Language, Translate, History } from '@mui/icons-material';
import '../../styles/Dashboard.css';

const Dashboard = () => {
  const titleRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    // Animate title
    gsap.from(titleRef.current, {
      duration: 1,
      y: -50,
      opacity: 0,
      ease: 'power3.out'
    });

    // Animate cards
    cardRefs.current.forEach((card, index) => {
      gsap.from(card, {
        duration: 0.8,
        scale: 0.5,
        opacity: 0,
        delay: 0.2 * index,
        ease: 'back.out(1.7)'
      });
    });
  }, []);

  const cards = [
    { title: 'Translate', icon: <Translate />, color: '#3f51b5' },
    { title: 'Languages', icon: <Language />, color: '#f50057' },
    { title: 'History', icon: <History />, color: '#00a152' },
  ];

  return (
    <Container className="dashboard">
      <Typography variant="h2" ref={titleRef} className="dashboard-title">
        Welcome to Your Translation Dashboard
      </Typography>
      <Grid container spacing={4}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={4} key={card.title}>
            <Paper
              ref={el => cardRefs.current[index] = el}
              className="dashboard-card"
              style={{ backgroundColor: card.color }}
            >
              {card.icon}
              <Typography variant="h5">{card.title}</Typography>
              <Button variant="contained" color="secondary">
                Go to {card.title}
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
