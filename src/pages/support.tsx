import React, { useState } from "react";

// Type definitions for props
interface PageMetaProps {
  title: string;
  description: string;
}

interface PageBreadcrumbProps {
  pageTitle: string;
}

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

interface DefaultInputProps {
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

interface TextAreaProps {
  id: string;
  rows?: number;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

// Page Meta Component
const PageMeta: React.FC<PageMetaProps> = ({ title }) => {
  if (typeof document !== "undefined") {
    document.title = title;
  }
  return null;
};

// Breadcrumb Component
const PageBreadcrumb: React.FC<PageBreadcrumbProps> = ({ pageTitle }) => (
  <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
      {pageTitle}
    </h2>
    <nav>
      <ol className="flex items-center gap-2">
        <li>
          <a className="font-medium text-gray-600 dark:text-gray-400" href="/">
            Dashboard /
          </a>
        </li>
        <li className="font-medium text-blue-600">{pageTitle}</li>
      </ol>
    </nav>
  </div>
);

// Label Component
const Label: React.FC<LabelProps> = ({ htmlFor, children }) => (
  <label
    htmlFor={htmlFor}
    className="mb-2.5 block font-medium text-gray-700 dark:text-gray-200"
  >
    {children}
  </label>
);

// Default Input Component
const DefaultInput: React.FC<DefaultInputProps> = ({
  id,
  type = "text",
  placeholder,
  value,
  onChange,
}) => (
  <input
    id={id}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full rounded-xl border border-gray-300 bg-transparent px-5 py-3 font-medium text-gray-700 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:cursor-default disabled:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-blue-500"
  />
);

// TextArea Component
const TextArea: React.FC<TextAreaProps> = ({
  id,
  rows = 4,
  placeholder,
  value,
  onChange,
}) => (
  <textarea
    id={id}
    rows={rows}
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full rounded-xl border border-gray-300 bg-transparent px-5 py-3 font-medium text-gray-700 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:cursor-default disabled:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-blue-500"
  />
);

// Main Support Form Component
const SupportForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [problem, setProblem] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ name, email, problem });
    setIsSubmitted(true);
    setTimeout(() => {
      setName("");
      setEmail("");
      setProblem("");
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6 bg-white dark:bg-gray-900 shadow-theme-xs">
      <h3 className="mb-6 text-lg font-semibold text-gray-800 dark:text-white/90">
        Contact Support
      </h3>

      {isSubmitted ? (
        <div className="flex flex-col items-center justify-center p-6 bg-green-50 dark:bg-green-900/20 rounded-2xl">
          <svg
            className="w-16 h-16 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 
              11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
            Thank You!
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Your support request has been sent.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <Label htmlFor="supportName">Your Name</Label>
            <DefaultInput
              id="supportName"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={setName}
            />
          </div>

          <div>
            <Label htmlFor="supportEmail">Your Email</Label>
            <DefaultInput
              id="supportEmail"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={setEmail}
            />
          </div>

          <div>
            <Label htmlFor="supportProblem">Describe your problem</Label>
            <TextArea
              id="supportProblem"
              rows={6}
              placeholder="Please provide details about the issue you are facing..."
              value={problem}
              onChange={setProblem}
            />
          </div>

          <div className="flex items-center gap-3 justify-end">
            <button
              type="button"
              onClick={() => {
                setName("");
                setEmail("");
                setProblem("");
              }}
              className="flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
            >
              Clear
            </button>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-full border border-blue-600 bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-theme-xs hover:bg-blue-700"
            >
              Submit Request
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

// The main page component that brings everything together
const SupportPage: React.FC = () => {
  return (
    <div className="p-4 md:p-6 2xl:p-10 bg-gray-50 dark:bg-gray-900 min-h-screen font-sans">
      <PageMeta
        title="Support Page | TailAdmin - React.js Admin Dashboard"
        description="Contact support for help with your issues."
      />
      <PageBreadcrumb pageTitle="Support" />

      <div className="max-w-3xl mx-auto">
        <SupportForm />
      </div>
    </div>
  );
};

export default SupportPage;
