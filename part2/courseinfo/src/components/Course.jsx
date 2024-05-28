/* eslint-disable react/prop-types */
const Header = (props) => {
  return (
    <div>
      <h2>{props.courses}</h2>
    </div>
  );
};

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part) => (
        <Part key={part.id} parts={part} />
      ))}
    </div>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.parts.name} {props.parts.exercises}
    </p>
  );
};

const Total = (props) => {
  return (
    <p>
      <strong>
        Total of {props.parts.reduce((sum, part) => sum + part.exercises, 0)}{" "}
        exercises
      </strong>
    </p>
  );
};

export default function Course({ course }) {
  return (
    <div>
      <Header courses={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
}
