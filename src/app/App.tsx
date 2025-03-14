import { FormulaInput } from "@/objects/formula";
import "./styles/index.css";

export const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Formula Editor</h1>
        <FormulaInput />
      </div>
    </div>
  );
};
