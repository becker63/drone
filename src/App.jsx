import * as React from "react";
import { useState, useEffect, useRef } from "react";
import "./fuckinlinestyles.css";
import { syntaxHighlight } from "./hooksandhelpers";
// 1. import `ChakraProvider` component
import {
  ChakraProvider,
  Grid,
  GridItem,
  Center,
  StepSeparator,
} from "@chakra-ui/react";
import { Joystick } from "react-joystick-component";

export default () => {
  document.body.style = "background: black;";
  const ref = React.useRef(null);
  const messagesEndRef = useRef(null);
  const [move, handleMove] = useState({ x: 0, y: 0 });
  const [arr, sarr] = useState([{ x: 0, y: 0 }]);
  const [over, sover] = useState(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    if (
      (move.x != 0) &
      (move.y != !0) &
      !((arr[arr.length - 1].x == move.x) & (arr[arr.length - 1].y == move.y))
    ) {
      sarr((arr) => [...arr, move]);
    }
    if (ref.current.scrollHeight / 3 > window.innerHeight) {
      sarr([move]);
    }
    scrollToBottom();

    
  });

  return (
    <ChakraProvider>
      <Grid
        h="100vh"
        templateColumns="repeat(8, 1fr)"
        templateRows="repeat(1, 1fr)"
        gap={4}
      >
        <GridItem colSpan={6} bg="white" rounded={true}>
          <Center h="100vh">
            <Joystick
              baseColor="#565656"
              stickColor="black"
              size={500}
              move={(e) => {
                handleMove({
                  x: parseFloat(e.x.toFixed(2)),
                  y: parseFloat(e.y.toFixed(2)),
                  direction: e.direction,
                  dist: parseFloat(e.distance.toFixed(2)),
                });
              }}
              stop={() => {
                handleMove({ x: 0, y: 0, type: e.type });
              }}
            />
          </Center>
        </GridItem>

        <GridItem colSpan={2} bg="white" className="overflowcontainer">
          <Center>
            <div ref={ref}>
              {arr.map((cord) => (
                //this is bad dont do this \/, Im using it because I know what im doing
                <div
                  dangerouslySetInnerHTML={{
                    __html: syntaxHighlight(JSON.stringify(cord)),
                  }}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </Center>
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
};
