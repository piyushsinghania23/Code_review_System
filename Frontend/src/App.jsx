import { useEffect, useState } from 'react'
import 'prismjs/themes/prism-tomorrow.css'
import Editor from 'react-simple-code-editor'
import prism from 'prismjs'
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'
import axios from 'axios'
import './App.css'

function App() {
  const [code, setCode] = useState(` function sum() {
  return 1 + 1
}`)
  const [review, setReview] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  const reviewEndpoint = import.meta.env.DEV
    ? '/ai/get-review'
    : '/api/get-review';

  function getErrorMessage(error) {
    if (error?.message === 'Network Error') {
      return import.meta.env.DEV
        ? 'Cannot connect to backend (http://localhost:3000). Start BackEnd server with: npm.cmd run dev'
        : 'Cannot connect to backend API. Ensure Vercel deployment has GOOGLE_GEMINI_KEY set.';
    }

    const data = error?.response?.data;

    if (typeof data === 'string' && data.trim()) return data;
    if (data?.error) return data.error;
    if (data?.message) return data.message;

    return error?.message || 'Something went wrong while requesting code review.';
  }

  async function reviewCode() {
    setLoading(true);
    setReview('');

    try {
      const response = await axios.post(reviewEndpoint, { code });
      const result = typeof response.data === 'string'
        ? response.data
        : JSON.stringify(response.data, null, 2);
      setReview(result);
    } catch (error) {
      const message = getErrorMessage(error);
      setReview(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(value) => setCode(value)}
              highlight={(value) => prism.highlight(value, prism.languages.javascript, 'javascript')}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: '1px solid #ddd',
                borderRadius: '5px',
                height: '100%',
                width: '100%'
              }}
            />
          </div>
          <div onClick={!loading ? reviewCode : undefined} className="review">
            {loading ? 'Reviewing...' : 'Review'}
          </div>
        </div>
        <div className="right">
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        </div>
      </main>
    </>
  )
}

export default App
