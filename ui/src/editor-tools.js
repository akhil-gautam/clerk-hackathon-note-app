import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import List from '@editorjs/list';
import Warning from '@editorjs/warning';
import Code from '@editorjs/code';
import LinkTool from '@editorjs/link';
import Image from '@editorjs/image';
import Raw from '@editorjs/raw';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import CheckList from '@editorjs/checklist';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import SimpleImage from '@editorjs/simple-image';

export const EDITOR_JS_TOOLS = {
  checklist: CheckList,
  code: Code,
  delimiter: Delimiter,
  embed: Embed,
  header: Header,
  image: Image,
  inlineCode: InlineCode,
  linkTool: LinkTool,
  list: List,
  marker: Marker,
  quote: Quote,
  raw: Raw,
  simpleImage: SimpleImage,
  table: Table,
  warning: Warning,
};
