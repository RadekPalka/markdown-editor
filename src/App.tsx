import { MarkdownEditor } from './components/MarkdownEditor';
import { MarkDownPreview } from './components/MarkdownPreview';
import { Toolbar } from './components/Toolbar';

function App() {
	return (
		<div className='min-h-screen md:flex block w-screen flex-wrap h-full'>
			<Toolbar />
			<MarkdownEditor />
			<MarkDownPreview />
		</div>
	);
}

export default App;
