import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = "AIzaSyAe0vpnq2Tj8INzfWwCwBPpgPbNgyDoQlA";



// Create a new component. This component should produce some HTML
class App extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            videos: [], 
            selectedVideo: null
        };

        this.videoSearch('DOA5LR');
    };

    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (data) => {
            this.setState({
                videos: data, 
                selectedVideo: data[0]
            });
        });
    }

    render(){
        // debounce會回傳一個新function，而這function每過x毫秒才能再被呼叫
        const videoSearch = _.debounce((term) => {
            this.videoSearch(term)
        }, 2300);

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList 
                    onVideoSelect={(selectedVideo) => this.setState({selectedVideo})}
                    videos={this.state.videos} />
            </div>
        )
    };
}

// Take this component's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));

