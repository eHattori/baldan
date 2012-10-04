<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class EC9_Pagination {

    var $base_url			= '';
    var $prefix				= '';
    var $suffix				= '';

    var $total_rows			=  0;
    var $per_page			= 10;
    var $num_links			=  2;
    var $cur_page			=  0;
    var $use_page_numbers	= FALSE;
    var $first_link			= '<<';
    var $next_link			= '>';
    var $prev_link			= '<';
    var $last_link			= '>>';
    var $uri_segment		= 3;
    var $full_tag_open		= '<ul>';
    var $full_tag_close		= '</ul>';
    var $first_tag_open		= '<li>';
    var $first_tag_close	= '</li>';
    var $last_tag_open		= '<li>';
    var $last_tag_close		= '</li>';
    var $first_url			= '';
    var $cur_tag_open		= '<li class="active">';
    var $cur_tag_close		= '</li>';
    var $next_tag_open		= '<li>';
    var $next_tag_close		= '</li>';
    var $prev_tag_open		= '<li>';
    var $prev_tag_close		= '</li>';
    var $num_tag_open		= '<li>';
    var $num_tag_close		= '</li>';
    var $page_query_string	= FALSE;
    var $query_string_segment = 'per_page';
    var $display_pages		= TRUE;
    var $anchor_class		= '';
    var $next_link_open_desabled    = '<li class="disabled">';
    var $next_link_close_desabled   = '</li>';
    var $prev_link_open_desabled    = '<li class="disabled">';
    var $prev_link_close_desabled   = '</li>';
    var $first_link_open_desabled   = '<li class="disabled">';
    var $first_link_close_desabled  = '</li>';
    var $last_link_open_desabled    = '<li class="disabled">';
    var $last_link_close_desabled   = '</li>';
    var $enable_params 		        = false;
    var $params_query_string        = '';

    public function __construct($params = array())
    {
        if (count($params) > 0)
        {
            $this->initialize($params);
        }

        if ($this->anchor_class != '')
        {
            $this->anchor_class = 'class="'.$this->anchor_class.'" ';
        }

        log_message('debug', "Pagination Class Initialized");
    }

    function initialize($params = array())
    {
        if (count($params) > 0)
        {
            foreach ($params as $key => $val)
            {
                if (isset($this->$key))
                {
                    $this->$key = $val;
                }
            }
        }
    }

    function create_links()
    {
        if($this->enable_params && $this->params_query_string){
            $this->params_query_string = "?".$this->params_query_string;
        }

        if ($this->total_rows == 0 OR $this->per_page == 0)
        {
            return '';
        }

        $num_pages = ceil($this->total_rows / $this->per_page);

        if ($num_pages == 1)
        {
            return '';
        }

        if ($this->use_page_numbers)
        {
            $base_page = 1;
        }
        else
        {
            $base_page = 0;
        }

        $CI =& get_instance();

        if ($CI->config->item('enable_query_strings') === TRUE OR $this->page_query_string === TRUE)
        {
            if ($CI->input->get($this->query_string_segment) != $base_page)
            {
                $this->cur_page = $CI->input->get($this->query_string_segment);

                $this->cur_page = (int) $this->cur_page;
            }
        }
        else
        {
            if ($CI->uri->segment($this->uri_segment) != $base_page)
            {
                $this->cur_page = $CI->uri->segment($this->uri_segment);

                $this->cur_page = (int) $this->cur_page;
            }
        }

        if ($this->use_page_numbers AND $this->cur_page == 0)
        {
            $this->cur_page = $base_page;
        }

        $this->num_links = (int)$this->num_links;

        if ($this->num_links < 1)
        {
            show_error('Your number of links must be a positive number.');
        }

        if ( ! is_numeric($this->cur_page))
        {
            $this->cur_page = $base_page;
        }

        if ($this->use_page_numbers)
        {
            if ($this->cur_page > $num_pages)
            {
                $this->cur_page = $num_pages;
            }
        }
        else
        {
            if ($this->cur_page > $this->total_rows)
            {
                $this->cur_page = ($num_pages - 1) * $this->per_page;
            }
        }

        $uri_page_number = $this->cur_page;

        if ( ! $this->use_page_numbers)
        {
            $this->cur_page = floor(($this->cur_page/$this->per_page) + 1);
        }

        $start = (($this->cur_page - $this->num_links) > 0) ? $this->cur_page - ($this->num_links - 1) : 1;
        $end   = (($this->cur_page + $this->num_links) < $num_pages) ? $this->cur_page + $this->num_links : $num_pages;

        if ($CI->config->item('enable_query_strings') === TRUE OR $this->page_query_string === TRUE)
        {
            $this->base_url = rtrim($this->base_url).'&amp;'.$this->query_string_segment.'=';
        }
        else
        {
            $this->base_url = rtrim($this->base_url, '/') .'/';
        }

        $output = '';

        if  ($this->first_link !== FALSE AND $this->cur_page != 1)
        {
            $first_url = ($this->first_url == '') ? $this->base_url : $this->first_url;
            $output .= $this->first_tag_open.'<a '.$this->anchor_class.'href="'.$first_url.$this->params_query_string.'">'.$this->first_link.'</a>'.$this->first_tag_close;
        }else{
            $output .= $this->first_link_open_desabled.'<a href="#" onclick="return false">'.$this->first_link.'</a>'.$this->first_link_close_desabled;
        }

        // Render the "previous" link
        if  ($this->prev_link !== FALSE AND $this->cur_page != 1)
        {
            if ($this->use_page_numbers)
            {
                $i = $uri_page_number - 1;
            }
            else
            {
                $i = $uri_page_number - $this->per_page;
            }

            if ($i == 0 && $this->first_url != '')
            {
                $output .= $this->prev_tag_open.'<a '.$this->anchor_class.'href="'.$this->first_url.$this->params_query_string.'">'.$this->prev_link.'</a>'.$this->prev_tag_close;
            }
            else
            {
                $i = ($i == 0) ? '' : $this->prefix.$i.$this->suffix;
                $output .= $this->prev_tag_open.'<a '.$this->anchor_class.'href="'.$this->base_url.$i.$this->params_query_string.'">'.$this->prev_link.'</a>'.$this->prev_tag_close;
            }

        }else{
            $output .= $this->prev_link_open_desabled.'<a href="#" onclick="return false">'.$this->prev_link.'</a>'.$this->prev_link_close_desabled;
        }

        // Render the pages
        if ($this->display_pages !== FALSE)
        {
            // Write the digit links
            for ($loop = $start -1; $loop <= $end; $loop++)
            {
                if ($this->use_page_numbers)
                {
                    $i = $loop;
                }
                else
                {
                    $i = ($loop * $this->per_page) - $this->per_page;
                }

                if ($i >= $base_page)
                {
                    if ($this->cur_page == $loop)
                    {
                        $output .= $this->cur_tag_open.'<a href="#" onclick="return false;">'.$loop.'</a>'.$this->cur_tag_close; // Current page
                    }
                    else
                    {
                        $n = ($i == $base_page) ? '' : $i;

                        if ($n == '' && $this->first_url != '')
                        {
                            $output .= $this->num_tag_open.'<a '.$this->anchor_class.'href="'.$this->first_url.$this->params_query_string.'">'.$loop.'</a>'.$this->num_tag_close;
                        }
                        else
                        {
                            $n = ($n == '') ? '' : $this->prefix.$n.$this->suffix;

                            $output .= $this->num_tag_open.'<a '.$this->anchor_class.'href="'.$this->base_url.$n.$this->params_query_string.'">'.$loop.'</a>'.$this->num_tag_close;
                        }
                    }
                }
            }
        }

        // Render the "next" link
        if ($this->next_link !== FALSE AND $this->cur_page < $num_pages)
        {
            if ($this->use_page_numbers)
            {
                $i = $this->cur_page + 1;
            }
            else
            {
                $i = ($this->cur_page * $this->per_page);
            }

            $output .= $this->next_tag_open.'<a '.$this->anchor_class.'href="'.$this->base_url.$this->prefix.$i.$this->suffix.$this->params_query_string.'">'.$this->next_link.'</a>'.$this->next_tag_close;
        }else{
            $output .= $this->next_link_open_desabled.'<a href="#" onclick="return false">'.$this->next_link.'</a>'.$this->next_link_close_desabled;
        }

        // Render the "Last" link
        if ($this->last_link !== FALSE AND ($this->cur_page) < $num_pages)
        {
            if ($this->use_page_numbers)
            {
                $i = $num_pages;
            }
            else
            {
                $i = (($num_pages * $this->per_page) - $this->per_page);
            }
            $output .= $this->last_tag_open.'<a '.$this->anchor_class.'href="'.$this->base_url.$this->prefix.$i.$this->suffix.$this->params_query_string.'">'.$this->last_link.'</a>'.$this->last_tag_close;
        }else{
            $output .= $this->last_link_open_desabled.'<a href="#" onclick="return false">'.$this->last_link.'</a>'.$this->last_link_close_desabled;
        }

        // Kill double slashes.  Note: Sometimes we can end up with a double slash
        // in the penultimate link so we'll kill all double slashes.
        $output = preg_replace("#([^:])//+#", "\\1/", $output);

        // Add the wrapper HTML if exists
        $output = $this->full_tag_open.$output.$this->full_tag_close;

        return $output;
    }
}
// END Pagination Class

/* End of file Pagination.php */
/* Location: ./system/libraries/Pagination.php */