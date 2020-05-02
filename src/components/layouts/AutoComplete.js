import React from 'react'
import Downshift from "downshift";
import { useHistory } from 'react-router-dom'




function AutoSug(props) {


  let fillterName = props.items.map(item => ({ value: item.Brand + ' ' + item.Name, id:item.id }));

  let history = useHistory()

  return (
    <Downshift onChange={selection =>{
      history.push(`/Mobile/${selection.id}`)
    }
      
    } itemToString={item => (item ? item.value : '')}
    >
      {
        ({ getInputProps, isOpen, highlightedIndex, getMenuProps, getItemProps, inputValue, selectedItem }) => (
          <div>
            <input {...getInputProps()}   className="form-control mr-sm-2" placeholder="Search" />
           

            <div className="card" style={{  position:'absolute',height: isOpen ? '200px' : '0px' , overflowY: isOpen ? 'scroll' : 'hidden' }} >
              <ul {...getMenuProps()} className="list-group list-group-flush" >
                {
                  isOpen ? fillterName.filter(item => !inputValue || item.value.includes(inputValue))
                    .map((item, index) => (
                      <li
                        {...getItemProps({
                          key: item.value,
                          index,
                          item,
                          style: {
                            backgroundColor:
                              highlightedIndex === index ? 'lightgray' : 'white',
                            fontWeight: selectedItem === item ? 'bold' : 'normal',
                          },
                        })}
                        className="list-group-item"
                      >
                        {item.value}
                      </li>
                    ))
                    : null
                }

              </ul>
            </div>
          </div>
        )
      }
    </Downshift>
  )
}

export default AutoSug;
