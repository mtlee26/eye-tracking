import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import GazeButton from "@/components/gazeButton";
import Navbar from "@/components/NavBar";
import MainLayout from "@/components/mainLayout";

export const metadata = {
  title: "Play | Quiz | Eyetertainment",
};

const QuizDetailPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const { query } = useRouter();
  const { setId } = query;
  const router = useRouter();

  useEffect(() => {
    document.title = metadata.title;
  }, []);

  useEffect(() => {
    if (setId) {
      const fetchQuestions = async () => {
        const response = await fetch(`/api/quiz/${setId}`);
        const data = await response.json();
        setQuestions(data.questions);
      };

      fetchQuestions();
    }
  }, [setId]);

  const handleAnswerClick = (answer) => {
    if (answer === questions[currentQuestionIndex].correct_answer) {
      setScore((prevScore) => prevScore + 1); // Tinh diem
    }

    setSelectedAnswer(answer);
    setTimeout(() => {
      setSelectedAnswer(null);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1); // chuyen cau hoi
    }, 0);
  };

  // kiem tra xem het cau hoi chua
  if (currentQuestionIndex >= questions.length) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="bg-[#1e1f25] w-[1000px] h-[600px] p-6 rounded-xl flex flex-col justify-between">
            <h1 className="text-5xl font-bold mb-8 text-[#c4c6d0] text-center mt-10">
              Quiz Completed
            </h1>
            <p className="text-5xl font-semibold text-lg mb-6 text-[#c4c6d0] text-center">
              Your score: {score} / {questions.length}
            </p>
            <GazeButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/quiz")}
              className="font-bold bg-[#bfc6dc] text-2xl text-[#293041] py-3 rounded-lg hover:bg-[#3f4759] hover:text-[#dbe2f9] shadow-lg transition mb-10 mx-auto"
              style={{ width: "200px", height: "100px" }}
            >
              Try Another Quiz
            </GazeButton>
          </div>
        </div>
      </MainLayout>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  // shuffle answers
  const allAnswers = [
    ...JSON.parse(currentQuestion.incorrect_answers),
    currentQuestion.correct_answer,
  ];
  const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

  return (
    <MainLayout>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-[#1e1f25] w-[1000px] h-[600px] p-6 rounded-xl flex flex-col justify-between">
          <h1 className="text-2xl font-bold mb-8 text-[#c4c6d0] text-center mt-10">
            Question {currentQuestionIndex + 1}: {currentQuestion.question}
          </h1>

          <div className="grid grid-cols-2 gap-10 justify-items-center">
            {shuffledAnswers.map((answer, index) => (
              <GazeButton
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswerClick(answer)}
                className={`w-[300px] h-[100px] py-4 rounded-lg bg-[#bfc6dc] text-[#293041] font-semibold hover:bg-[#3f4759] hover:text-[#dbe2f9] shadow-lg transition 
                  ${selectedAnswer === answer ? "bg-[#6495ed]" : ""} text-2xl`}
              >
                {answer}
              </GazeButton>
            ))}
          </div>

          <div className="mt-6 text-[#c4c6d0] text-lg font-bold text-center">
            Score: {score}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export async function getServerSideProps(context) {
  const { setId } = context.params;
  return {
    props: {
      setId,
    },
  };
}

export default QuizDetailPage;
