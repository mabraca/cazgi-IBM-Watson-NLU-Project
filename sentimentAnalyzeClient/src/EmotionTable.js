import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
      let data = this.props.emotions;
      
      return (  
        <div>
          <table className="table table-bordered">
            <tbody>
            {   
                data.map(function(mapentry, index) {
                  return (
                      <tr key={index}>
                      <td>{mapentry.text}</td>
                      <td>{mapentry.relevance}</td>
                      </tr>
                  )
                  })
            }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;