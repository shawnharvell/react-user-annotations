import React from "react";
import { Annotatable, AnnotatableProps, enterAnnotationMode } from ".";
import { v4 as uuidv4 } from "uuid";

import "../../assets/react-user-annotations.scss";

export default {
  title: "Annotatable",
};

const props: AnnotatableProps = {
  persistenceKey: "storybook-key",
  initialPins: [
    { xPixels: 100, yPixels: 100, xPercent: 10, yPercent: 10, color: "red", guid: uuidv4() },
  ],
};

export const basic = (): JSX.Element => {
  return (
    <>
      <Annotatable {...props}>
        <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
        <p>
          Morbi pharetra enim ac sapien fringilla dapibus. Integer sollicitudin pellentesque nisi,
          non euismod augue aliquam eu. Etiam eget nulla vehicula, lacinia nisi at, congue augue.
          Nulla consectetur laoreet ipsum, vitae vehicula nulla. Mauris rhoncus, ligula a accumsan
          aliquam, nunc ante blandit massa, sed gravida lorem enim quis augue. Curabitur pretium ut
          purus quis semper. Morbi quis gravida massa. Morbi ante ipsum, pulvinar in tortor a,
          bibendum vehicula erat. Phasellus at malesuada erat.
        </p>
        <p>
          Donec nec ex dictum, consectetur turpis id, mattis arcu. Donec non ultrices purus. Cras
          dignissim dui at erat faucibus, a ultrices arcu pellentesque. Maecenas feugiat consequat
          nibh lacinia bibendum. Phasellus eget sapien a ex malesuada finibus. Aliquam vestibulum
          nibh vehicula tincidunt gravida. Quisque auctor imperdiet purus, at ullamcorper diam
          vestibulum et. Vestibulum euismod vel urna ut mattis. Cras sit amet velit sapien. Aliquam
          eros leo, imperdiet id lectus sit amet, scelerisque fermentum risus.
        </p>
        <p>
          Aliquam id lorem nisl. Morbi sed iaculis eros. Suspendisse consectetur malesuada volutpat.
          Sed hendrerit augue vel vestibulum accumsan. Pellentesque ultricies velit et eros
          dignissim, nec vehicula sapien consequat. Proin nec mollis sem. Nullam aliquet ante non
          sapien convallis, vitae venenatis mi iaculis. Proin eleifend convallis convallis. Proin ut
          felis placerat, imperdiet arcu facilisis, viverra purus. Curabitur porttitor, ligula nec
          venenatis dictum, neque eros ultricies urna, id tempor ex ante id eros. Phasellus velit
          neque, suscipit quis tincidunt ac, iaculis sit amet ligula. Pellentesque sagittis leo
          ante, vel bibendum felis pellentesque et. Sed convallis convallis mi non laoreet. Nam
          iaculis nibh et facilisis accumsan. Sed non est vel orci ultricies volutpat eget a odio.
        </p>
        <p>
          Aliquam tellus neque, placerat eu scelerisque non, venenatis nec sapien. Phasellus varius
          est quis tempus euismod. Aenean dapibus dui sit amet libero fringilla ultrices.
          Pellentesque maximus vel massa eu suscipit. Mauris purus massa, gravida vitae odio id,
          interdum dignissim eros. Nunc id interdum metus. Quisque sit amet elit et ex tempus
          maximus. Donec non diam nec nisl aliquam luctus. Curabitur consequat velit nec nibh
          consectetur fringilla.
        </p>
      </Annotatable>
      <button onClick={() => enterAnnotationMode()}>Add Annotation</button> <i>(or ALT-click)</i>
    </>
  );
};
